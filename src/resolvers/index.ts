import pkg from 'lodash';
const { merge } = pkg;

// import resolvers
import { client_resolvers } from './client/client-resolvers.js';
import { project_resolvers } from './project/project-resolvers.js';
import { skill_resolvers } from './skill/skill-resolvers.js';
import { specialization_resolvers } from './specialization/specialization-resolvers.js';
import { organization_office_resolvers } from './office/office-resolvers.js';
import { smokeTestQueryResolver } from './smoke-test/smoke-test-queries.js';
import { emailQueryResolver } from './user-details/user-details-queries.js';

export const resolvers = merge(
  specialization_resolvers,
  skill_resolvers,
  client_resolvers,
  project_resolvers,
  organization_office_resolvers,
  smokeTestQueryResolver,
  emailQueryResolver,
);
