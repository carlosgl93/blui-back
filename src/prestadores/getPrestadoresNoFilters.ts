import { Response } from "express";
import { getPool } from "../db/db";

export const getPrestadoresNoFilters = async (res: Response) => {
  try {
    console.log("inside without any filters");
    const data = await getPool().request().query`
        SELECT TOP 20 P.id, P.firstname, P.email, P.description, P.phone, P.address, P.city, P.region, P.country, P.service_id, P.speciality_id, P.lastname, P.comuna_id, P.offers_free_meet_greet, AVG(R.Score) as average_review, COUNT(R.id) as total_reviews
        FROM Prestador P
        LEFT JOIN Reviews R ON P.Id = R.prestador_id
        GROUP BY P.id, P.firstname, P.email, P.description, P.phone, P.address, P.city, P.region, P.country, P.service_id, P.speciality_id, P.lastname, P.comuna_id, P.offers_free_meet_greet;
      `;

    return res.status(200).send(data.recordset);
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "There was an error fetching prestadores without any filters.",
      statusCode: 500
    });
  }
};
