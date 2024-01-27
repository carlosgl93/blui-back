// prestadorController.ts
import { Request, Response } from "express";
import {
  getPrestadores,
  getPrestadorById,
  verifyPrestador,
  createPrestador,
  getPrestadorComunas as getComunas
} from "../prestadores";

export const getAllPrestadores = (req: Request, res: Response) => {
  getPrestadores(req, res);
};

export const getPrestador = (req: Request, res: Response) => {
  getPrestadorById(req, res);
};

export const postVerifyPrestador = (req: Request, res: Response) => {
  verifyPrestador(req, res);
};

export const postPrestador = (req: Request, res: Response) => {
  createPrestador(req, res);
};

export const getPrestadorComunas = (req: Request, res: Response) => {
  getComunas(req, res);
};
