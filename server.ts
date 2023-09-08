import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { ApolloServerPluginUsageReportingDisabled } from '@apollo/server/plugin/disabled';
import { gql } from 'graphql-tag';
import { readFileSync } from 'fs';
import { resolvers } from './src/resolvers/index.js';
import { Context, prisma } from './src/utils/contexts.js';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { permissions } from './src/permission/index.js';
import { applyMiddleware } from 'graphql-middleware';
import { AuthDataSource } from './src/datasources/auth-data-source.js';
import logger from './src/utils/logger.js';
import 'dotenv/config';
import * as Sentry from '@sentry/node';
import { Integrations } from '@sentry/tracing';
import { NodeOptions } from '@sentry/node';
import { ProfilingIntegration } from '@sentry/profiling-node';
import { ProjectScheduler } from './src/schedulers/project-scheduler.js';

const env = process.env.ENVIRONMENT;

const typeDefs = gql(
  readFileSync('./src/schema/schema.graphql', { encoding: 'utf-8' }),
);

const schema = applyMiddleware(
  buildSubgraphSchema({
    typeDefs,
    resolvers,
  }),
  permissions,
);

const app = express();
const httpServer = http.createServer(app);

// Set up Apollo Server
const server = new ApolloServer<Context>({
  schema,
  plugins: [ApolloServerPluginUsageReportingDisabled()],
});
await server.start();

app.use(
  cors(),
  bodyParser.json(),
  expressMiddleware(server, {
    context: async ({ req }) => {
      return {
        prisma,
        req,
        dataSources: {
          AuthDataSource: AuthDataSource,
        },
      };
    },
  }),
);

await new Promise<void>((resolve) => {
  httpServer.listen({ port: 4000 }, resolve);
});

Sentry.init({
  dsn: 'https://20266b4ed48b29843ef756574352ad9a@o1182568.ingest.sentry.io/4505703132954624',
  environment: env,
  profilesSampleRate: 1.0,
  logErrors: true,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Express({ app }),
    new ProfilingIntegration(),
  ],
  tracesSampler: () => {
    if (env === 'production') {
      return 1.0;
    } else if (env === 'staging') {
      return 0.75;
    } else if (env === 'testing') {
      return 0.5;
    } else if (env === 'local') {
      return 0;
    } else {
      return 0.1;
    }
  },
  sampleRate: process.env.IS_LOCAL ? 0.0 : 1.0,
} as NodeOptions);

app.use(Sentry.Handlers.requestHandler() as express.RequestHandler);
app.use(Sentry.Handlers.errorHandler() as express.ErrorRequestHandler);
app.use(
  Sentry.Handlers.errorHandler({
    shouldHandleError(error) {
      // Capture all 404 and 500 errors
      return error.status === 404 || error.status === 500;
    },
  }),
);

logger.info(`🚀 Server ready at http://localhost:4000`);

const scheduler = new ProjectScheduler();
