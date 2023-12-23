import { Response } from "express";
import { getPool } from "../db/db";

export const getPrestadoresByServicioAndEspecialidad = async (
  res: Response,
  servicio: number,
  especialidad: number
) => {
  try {
    console.log("inside only service and especialidad");
    const data = await getPool().request().query`
        SELECT TOP 200 * FROM Prestador WHERE service_id = ${servicio} AND especialidad_id = ${especialidad};
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
