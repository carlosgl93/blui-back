import sql from "mssql";
import dotenv from "dotenv";

dotenv.config();

const isProd = process.env.ENVIRONMENT === "production";

const config = isProd
  ? {
      user: process.env.PROD_DB_USER!,
      password: process.env.PROD_DB_PASSWORD!,
      server: process.env.PROD_DB_HOST!,
      database: process.env.PROD_DB_NAME!,
      options: {
        encrypt: true,
        enableArithAbort: true
      }
    }
  : {
      user: process.env.LOCAL_DB_USER!,
      password: process.env.LOCAL_DB_PASSWORD!,
      server: process.env.LOCAL_DB_HOST!,
      database: process.env.LOCAL_DB_NAME!,
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
    console.error("Connection failed", err);
  }
};

export const getPool = () => {
  if (!pool) {
    throw new Error("Database connection not established. Call connectDb first.");
  }
  return pool;
};
