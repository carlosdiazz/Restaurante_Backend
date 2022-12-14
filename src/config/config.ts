import * as dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const MONGO_URI = process.env.MONGO_URI || '';
export const ENV = process.env.NODE_ENV || 'dev';
export const SECRET_JWT_TOKEN = process.env.SECRET_JWT_TOKEN || 'tokentest';