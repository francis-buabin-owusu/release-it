import { GraphQLClient, gql } from 'graphql-request';
import dotenv from 'dotenv';

dotenv.config();
const URL = process.env.BACKEND_URL;

const client = new GraphQLClient(URL);

export const getUserDetails = async (userId: number | string) => {
  const query = gql`
    query GetUserInfo($userId: Int) {
      getUserInfo(userId: $userId) {
        user {
          first_name
          last_name
          other_name
          email
        }
      }
    }
  `;
  const variables = { userId };

  try {
    return await client.request(query, variables);
  } catch (error) {
    return error;
  }
};
