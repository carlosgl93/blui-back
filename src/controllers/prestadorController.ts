// prestadorController.ts
import { Request, Response } from "express";
import {
  getPrestadores,
  getPrestadorById,
  verifyPrestador,
  createPrestador,
  getPrestadorComunas
} from "../prestadores";
import { postPrestadorComunas } from "../prestadores/postPrestadorComunas";

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

export const getComunas = (req: Request, res: Response) => {
  getPrestadorComunas(req, res);
};

export const postComunas = (req: Request, res: Response) => {
  postPrestadorComunas(req, res);
};
