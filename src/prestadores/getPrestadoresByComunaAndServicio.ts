import { Response } from "express";
import { getPool } from "../db/db";

export const getPrestadoresByComunaAndServicio = async (res: Response, comuna: number, servicio: number) => {
  console.log("inside with comuna and servicio");
  try {
    const data = await getPool().request().query`
      SELECT P.id, P.firstname, P.lastname, P.email, P.phone, P.service_id, P.comuna_id, P.speciality_id, AVG(R.Score) as average_review 
      FROM Prestador P
      LEFT JOIN Reviews R ON P.Id = R.prestador_id
      WHERE P.service_id = ${servicio} AND P.comuna_id = ${comuna}
      GROUP BY P.id, P.firstname, P.lastname, P.email, P.phone, P.service_id, P.comuna_id, P.speciality_id;`;
    return res.status(200).send(data.recordset);
  } catch (error) {
    return res.send({
      status: "error",
      message: "There was an error fetching prestadores with comuna and servicio.",
      statusCode: 500
    });
  }
};
