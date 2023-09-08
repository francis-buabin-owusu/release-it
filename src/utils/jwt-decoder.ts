import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { AES } from 'crypto-ts';

dotenv.config();

const secret = process.env.APP_SECRET_KEY;
const key = process.env.key;

export const verifyToken = (req) => {
  try {
    const value = req.headers.authorization;
    // Check for an undefined token
    if (value === undefined) throw new GraphQLError('Not Authorized');
    if (value.startsWith('Bearer')) {
      const token = value.substring(7, value.length);
      return jwt.verify(token, secret);
    }
    throw new GraphQLError('Invalid Token');
  } catch (error) {
    throw new GraphQLError(error.message);
  }
};

// encryption
export function Encrypt(text: string | string[]) {
  return AES.encrypt(text as string, key).toString();
}
