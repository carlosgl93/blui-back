import { Request, Response } from "express";
import { getPool } from "../db/db";

export const getAllServiciosAndEspecialidades = async (req: Request, res: Response) => {
  try {
    const data = await getPool().request().query`
      SELECT S.id as service_id, S.name as service_name, S.description as servicio_description, 
       E.id as especialidad_id, E.name as especialidad_name, E.description as especialidad_description
      FROM Servicio S
      LEFT JOIN Especialidad E ON S.id = E.servicio;
    `;

    const groupedData = data.recordset.reduce((acc, curr) => {
      if (!acc[curr.service_name]) {
        acc[curr.service_name] = {
          service_id: curr.service_id,
          service_name: curr.service_name,
          servicio_description: curr.servicio_description,
          especialidades: []
        };
      }

      acc[curr.service_name].especialidades.push({
        especialidad_id: curr.especialidad_id,
        especialidad_name: curr.especialidad_name,
        especialidad_description: curr.especialidad_description
      });

      return acc;
    }, {});

    res.send(groupedData);
  } catch (error) {
    return res.send({
      status: "error",
      message: "There was an error fetching servicios.",
      statusCode: 500
    });
  }
};
