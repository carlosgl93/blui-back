import sql from "mssql";
import {
  LOCAL_DB_USER,
  LOCAL_DB_PASSWORD,
  LOCAL_DB_HOST,
  LOCAL_DB_NAME,
  PROD_DB_USER,
  PROD_DB_PASSWORD,
  PROD_DB_HOST,
  PROD_DB_NAME,
  ENVIRONMENT
} from "../utils/config";
import { error } from "../utils/logger";

const isProd = ENVIRONMENT === "production";

const config = isProd
  ? {
      user: PROD_DB_USER!,
      password: PROD_DB_PASSWORD!,
      server: PROD_DB_HOST!,
      database: PROD_DB_NAME!,
      options: {
        encrypt: true,
        enableArithAbort: true
      }
    }
  : {
      user: LOCAL_DB_USER!,
      password: LOCAL_DB_PASSWORD!,
      server: LOCAL_DB_HOST!,
      database: LOCAL_DB_NAME!,
      options: {
        encrypt: false,
        enableArithAbort: true
      }
    };

let pool: sql.ConnectionPool;

export const connectDb = async () => {
  try {
    pool = await sql.connect(config);
    console.log("Connected to SQL Server");
  } catch (err) {
    error("Connection failed", err);
  }
};

export const getPool = () => {
  if (!pool) {
    throw new Error("Database connection not established. Call connectDb first.");
  }
  return pool;
};
