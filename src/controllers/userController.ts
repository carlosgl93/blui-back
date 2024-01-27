// userController.ts
import { Request, Response } from "express";
import { createUser, loginUser, getUserById, verifyUser } from "../users";

export const getUsers = (req: Request, res: Response) => {
  // Your existing getUsers function
};

export const postUser = (req: Request, res: Response) => {
  createUser(req, res);
};

export const postLogin = (req: Request, res: Response) => {
  loginUser(req, res);
};

export const getUser = (req: Request, res: Response) => {
  getUserById(req, res);
};

export const postVerifyUser = (req: Request, res: Response) => {
  verifyUser(req, res);
};
