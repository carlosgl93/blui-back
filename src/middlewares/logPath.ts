import { NextFunction, Request, Response } from "express";
import { info } from "../utils/logger";

const logPathMiddleware = (req: Request, res: Response, next: NextFunction) => {
  info(`Method: ${req.method} Path: ${req.path}`);
  next();
};

export default logPathMiddleware;
