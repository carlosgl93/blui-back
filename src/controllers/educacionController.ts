import { Request, Response } from "express";

import { deleteEducacionFormacion, getEducacion, postEducacion } from "../services/educacion";

export const get = (req: Request, res: Response) => getEducacion(req, res);

export const post = (req: Request, res: Response) => postEducacion(req, res);

export const deleteEntry = (req: Request, res: Response) => deleteEducacionFormacion(req, res);
