import { Request, Response } from "express";
import { getPool } from "../../db";

export const getAllExperiences = async (req: Request, res: Response) => {
  const request = getPool().request();

  try {
    const query = await request.query(`
        SELECT 
            GE.id AS ExpId,
            GE.label AS Experience,
            S.id AS SpecialityId,
            S.label AS Speciality
        FROM 
            GeneralExperience GE
        LEFT JOIN 
            Speciality S ON GE.id = S.generalExperienceId
        GROUP BY 
            GE.id, S.id, GE.label, S.label
        ORDER BY 
            GE.id, S.id;
    `);
    const recordset = query.recordset;

    // Create an array of unique GeneralExperience ids
    const uniqueExpIds = [...new Set(recordset.map(row => row.ExpId))];

    const experiences = uniqueExpIds.map(expId => {
      return {
        id: expId,
        label: recordset.find(row => row.ExpId === expId).Experience,
        specialities: recordset
          .filter(row => row.ExpId === expId)
          .map(row => {
            return {
              id: row.SpecialityId,
              label: row.Speciality
            };
          })
      };
    });

    return res.status(200).send(experiences);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).send({ message: error.message });
    }
    return res.status(500).send({ message: "Error al obtener las experiencias." });
  }
};
