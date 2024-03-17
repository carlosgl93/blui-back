import { Request, Response } from "express";

import { getHistorialLaboral, postHistorialLaboral, deleteHistorialLaboral } from "../services/historialLaboral";

export const get = (req: Request, res: Response) => getHistorialLaboral(req, res);

export const post = (req: Request, res: Response) => postHistorialLaboral(req, res);

export const deleteEntry = (req: Request, res: Response) => deleteHistorialLaboral(req, res);
