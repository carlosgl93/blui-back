import { Request, Response } from "express";

import { getPrestadorInboxMessages as getPrestador, getUsuarioInboxMessages as getUsuario } from "../services/chat";

export const getPrestadorInboxMessages = (req: Request, res: Response) => {
  getPrestador(req, res);
};

export const getUsuarioInboxMessages = (req: Request, res: Response) => {
  getUsuario(req, res);
};
