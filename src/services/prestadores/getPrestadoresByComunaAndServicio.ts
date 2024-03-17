import { Response } from "express";
import { getPool } from "../../db/db";

export const getPrestadoresByComunaAndServicio = async (res: Response, comuna: number, servicio: number) => {
  console.log("inside with comuna and servicio");

  const pool = getPool();
  const request = pool.request();
  request.input("comuna_id", comuna);
  request.input("service_id", servicio);

  try {
    const data = await request.query`
      SELECT P.id ,P.firstname, P.lastname, P.email, P.description, P.phone, P.service_id, P.comuna_id, P.speciality_id, P.offers_free_meet_greet, AVG(R.Score) as average_review, COUNT(R.id) as total_reviews 
      FROM Prestador P
      INNER JOIN Prestador_Comuna PC ON P.id = PC.prestador_id
      LEFT JOIN Reviews R ON P.id = R.prestador_id
      WHERE PC.comuna_id = 269 AND P.service_id = 3
      GROUP BY P.id, P.firstname, P.lastname, P.email, P.description, P.phone, P.service_id, P.comuna_id, P.speciality_id, P.offers_free_meet_greet;
    `;
    return res.status(200).send(data.recordset);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).send({
        status: "error",
        message: error.message,
        statusCode: 500
      });
    } else {
      return res.status(500).send({
        status: "error",
        message: "There was an error fetching prestadores with comuna and servicio.",
        statusCode: 500
      });
    }
  }
};
