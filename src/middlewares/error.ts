import { NextFunction, Request, Response } from "express";

export const errorMiddleware = (err: Error, req: Request, response: Response, next: NextFunction) => {
  console.error(err.stack);
  response.status(500).send("Something broke!");
};
