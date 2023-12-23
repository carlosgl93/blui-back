import { Response } from "express";
import { getPool } from "../db/db";

export const getPrestadoresNoFilters = async (res: Response) => {
  try {
    console.log("inside without any filters");
    const data = await getPool().request().query`
        SELECT TOP 200 * FROM Prestador;
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
