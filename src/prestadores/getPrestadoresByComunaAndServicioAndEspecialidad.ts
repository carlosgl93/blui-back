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
        SELECT TOP 200 P.id, P.firstname, P.lastname, P.email, P.phone, P.service_id, P.comuna_id, P.speciality_id, AVG(R.Score) as average_review 
        FROM Prestador P
        LEFT JOIN Reviews R ON P.Id = R.prestador_id
        WHERE P.service_id = ${servicio} AND P.comuna_id = ${comuna} AND P.speciality_id = ${especialidad}
        GROUP BY P.id, P.firstname, P.lastname, P.email, P.phone, P.service_id, P.comuna_id, P.speciality_id;
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
