import { Response } from "express";
import { getPool } from "../db/db";

export const getPrestadoresByServicio = async (res: Response, service_id: number) => {
  try {
    console.log("inside only service");
    const data = await getPool().request().query`
        SELECT TOP 200 * FROM Prestador WHERE service_id = ${service_id};
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
