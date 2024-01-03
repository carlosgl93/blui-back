import { Response } from "express";
import { getPool } from "../db/db";

export const getPrestadoresByComuna = async (res: Response, comuna: number) => {
  try {
    console.log("inside only comuna");
    const data = await getPool().request().query`
        SELECT TOP 20 P.id, P.firstname, P.lastname, P.email, P.phone, P.service_id, P.comuna_id, P.speciality_id, AVG(R.Score) as average_review, COUNT(R.id) as total_reviews 
        FROM Prestador P
        LEFT JOIN Reviews R ON P.Id = R.prestador_id 
        WHERE P.comuna_id = ${comuna}
        GROUP BY P.id, P.firstname, P.lastname, P.email, P.phone, P.service_id, P.comuna_id, P.speciality_id;
      `;

    return res.status(200).send(data.recordset);
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "There was an error fetching prestadores by comuna.",
      statusCode: 500
    });
  }
};
