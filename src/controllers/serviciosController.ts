import { Request, Response } from "express";

import { getAllServiciosAndEspecialidades } from "../services/servicios/getAllServiciosAndEspecialdades";

export const getServicios = (req: Request, res: Response) => {
  getAllServiciosAndEspecialidades(req, res);
};
