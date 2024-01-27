import dotenv from "dotenv";

dotenv.config();

export const ENVIRONMENT = process.env.ENVIRONMENT || "local";
export const LOCAL_DB_USER = process.env.LOCAL_DB_USER || "";
export const LOCAL_DB_PASSWORD = process.env.LOCAL_DB_PASSWORD || "";
export const LOCAL_DB_HOST = process.env.LOCAL_DB_HOST || "localhost";
export const LOCAL_DB_NAME = process.env.LOCAL_DB_NAME || "";
export const PROD_DB_USER = process.env.PROD_DB_USER || "";
export const PROD_DB_PASSWORD = process.env.PROD_DB_PASSWORD || "";
export const PROD_DB_HOST = process.env.PROD_DB_HOST || "";
export const PROD_DB_NAME = process.env.PROD_DB_NAME || "";
export const PORT = process.env.PORT || 3000;
export const SECRET = process.env.SECRET || "";
export const EMAIL_USERNAME = process.env.EMAIL_USERNAME || "";
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || "";
export const BASE_URL = process.env.BASE_URL || "http://localhost:5173";
