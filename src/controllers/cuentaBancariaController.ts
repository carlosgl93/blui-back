import { Request, Response } from "express";

import { getPrestadorCuentaBancaria, postPrestadorCuentaBancaria } from "../services/cuentaBancaria";

export const get = (req: Request, res: Response) => getPrestadorCuentaBancaria(req, res);

export const post = (req: Request, res: Response) => postPrestadorCuentaBancaria(req, res);
