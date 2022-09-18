import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

export const PORT = process.env.PORT || 3000;
export const MONGO_URI = process.env.MONGO_URI || '';

