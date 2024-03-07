import { Request, Response } from "express";

import { getAllComunas } from "../services/comunas";

export const getComunas = (req: Request, res: Response) => {
  console.log("inside get all comunas");
  getAllComunas(req, res);
};
