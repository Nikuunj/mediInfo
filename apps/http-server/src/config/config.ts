import dotenv from 'dotenv';

dotenv.config();

export const jwt_secret = process.env.JWT_SECRET || "default-secret";
export const frontend_url = process.env.FRONTEDN_ENDPOINT || "http://localhost:3000";
