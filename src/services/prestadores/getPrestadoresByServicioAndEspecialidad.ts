import { Response } from "express";
import { getPool } from "../../db/db";
import sql from "mssql";

export const getPrestadoresByServicioAndEspecialidad = async (
  res: Response,
  servicio: number,
  especialidad: number
) => {
  const request = getPool().request();
  request.input("servicio", sql.Int, servicio);
  request.input("especialidad", sql.Int, especialidad);
  try {
    console.log("inside only service and especialidad");
    const data = await request.query`
        SELECT TOP 20 P.id, P.firstname, P.lastname, P.email, P.description, P.phone, P.service_id, P.comuna_id, P.speciality_id, P.offers_free_meet_greet, AVG(R.Score) as average_review, COUNT(R.id) as total_reviews 
        FROM Prestador P
        LEFT JOIN Reviews R ON P.Id = R.prestador_id
        WHERE P.service_id = @servicio AND P.speciality_id = @especialidad
        GROUP BY P.id, P.firstname, P.lastname, P.email, P.description, P.phone, P.service_id, P.comuna_id, P.speciality_id, P.offers_free_meet_greet;
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
