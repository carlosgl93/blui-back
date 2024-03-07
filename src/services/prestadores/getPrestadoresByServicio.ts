import { Response } from "express";
import { getPool } from "../../db/db";

export const getPrestadoresByServicio = async (res: Response, servicio: number) => {
  const pool = getPool();
  const request = pool.request();
  request.input("service_id", servicio);

  try {
    console.log("inside only service");
    const data = await request.query`
        SELECT TOP 20 P.id, P.firstname, P.lastname, P.email, P.description, P.phone, P.service_id, P.comuna_id, P.speciality_id, P.offers_free_meet_greet, AVG(R.Score) as average_review, COUNT(R.id) as total_reviews 
        FROM Prestador P
        LEFT JOIN Reviews R ON P.Id = R.prestador_id
        WHERE P.service_id = @service_id
        GROUP BY P.id, P.firstname, P.lastname, P.email, P.description, P.phone, P.service_id, P.comuna_id, P.speciality_id, P.offers_free_meet_greet;
      `;

    return res.status(200).send(data.recordset);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).send({
        status: "error",
        message: "There was an error fetching prestadores by servicio." + error.message,
        statusCode: 500
      });
    }
    return res.status(500).send({
      status: "error",
      message: "There was an error fetching prestadores by servicio.",
      statusCode: 500
    });
  }
};
