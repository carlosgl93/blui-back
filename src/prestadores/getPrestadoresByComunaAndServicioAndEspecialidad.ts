import { Response } from "express";
import { getPool } from "../db/db";

export const getPrestadoresByComunaAndServicioAndEspecialidad = async (
  res: Response,
  comuna: number,
  servicio: number,
  especialidad: number
) => {
  try {
    console.log("inside with comuna, servicio and especialidad");
    const data = await getPool().request().query`
        SELECT TOP 200 * FROM Prestador WHERE service_id = ${servicio} AND comuna_id = ${comuna} AND especialidad_id = ${especialidad};
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
