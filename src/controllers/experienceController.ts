import { Request, Response } from "express";

import {
  getAllExperiences as getAll,
  postPrestadorExperience as savePrestadorExperiences,
  getPrestadorExperience as getPrestadorExp
} from "../experience";

export const getAllExperiences = (req: Request, res: Response) => {
  getAll(req, res);
};

export const getPrestadorExperience = (req: Request, res: Response) => {
  getPrestadorExp(req, res);
};

export const postPrestadorExperience = (req: Request, res: Response) => {
  savePrestadorExperiences(req, res);
};
