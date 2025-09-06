import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../../../.env") });

export const jwt_secret = process.env.JWT_SECRET || "default-secret";
export const frontend_url = process.env.FRONTEDN_ENDPOINT || "http://localhost:3000";