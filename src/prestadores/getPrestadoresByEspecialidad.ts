import { Request, Response } from "express";
import { getPool } from "../db/db";

const getPrestadoresByEspecialidad = async (req: Request, res: Response) => {
  try {
    const result = await getPool().request().query("");
    res.status(200).json({
      status: "success",
      data: result.recordset,
      message: "Fetched users successfully",
      statusCode: 200
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      res.status(500).json({
        status: "error",
        message: err.message,
        statusCode: 500
      });
    } else {
      console.error(err);
      res.status(500).json({
        status: "error",
        message: "An unknown error occurred.",
        statusCode: 500
      });
    }
  }
};

export default getPrestadoresByEspecialidad;
