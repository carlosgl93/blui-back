import { Request, Response } from "express";

import { getAllComunas } from "../comunas/";

export const getComunas = (req: Request, res: Response) => {
  // Your existing getAllComunas function
  getAllComunas(req, res);
};
