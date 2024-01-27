import { Request, Response } from "express";

import { getMessages as get, postMessage as post } from "../chat";

export const getMessages = (req: Request, res: Response) => {
  // Your existing getMessages function
  get(req, res);
};

export const postMessage = (req: Request, res: Response) => {
  post(req, res);
};
