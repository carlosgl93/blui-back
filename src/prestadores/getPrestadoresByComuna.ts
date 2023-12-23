import { Request, Response } from "express";
import { getPool } from "../db/db";

export const getPrestadoresByComuna = async (res: Response, comuna: number) => {
  try {
    console.log("inside only comuna");
    const data = await getPool().request().query`
        SELECT TOP 200 * FROM Prestador WHERE comuna_id = ${comuna};
      `;

    return res.status(200).send(data.recordset);
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "There was an error fetching prestadores.",
      statusCode: 500
    });
  }
};
