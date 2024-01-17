import { Request, Response } from "express";

import { getPool } from "../db/db";

export const getAllComunas = async (req: Request, res: Response) => {
  console.log("fetching comunas");

  try {
    const comunas = await getPool().request().query`SELECT * FROM Comuna`;
    const responseBody = comunas.recordset;

    return res.status(200).send(responseBody);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).send({
        status: "error",
        message: "There was an error fetching comunas. " + error.message,
        statusCode: 500
      });
    } else {
      return res.status(500).send({
        status: "error",
        message: "There was an error fetching comunas.",
        statusCode: 500
      });
    }
  }
};
