import { Request, Response } from "express";

import { getDisponibilidadByPrestadorId, postDisponibilidad as post } from "../services/disponibilidad";

export const getDisponibilidad = (req: Request, res: Response) => {
  getDisponibilidadByPrestadorId(req, res);
};

export const postDisponibilidad = (req: Request, res: Response) => {
  post(req, res);
};
