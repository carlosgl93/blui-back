// userRoutes.ts
import express from "express";
import { getUsers, postUser, postLogin, getUser, postVerifyUser } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post("/", postUser);
userRouter.post("/login", postLogin);
userRouter.get("/:id", getUser);
userRouter.post("/verify", postVerifyUser);

export default userRouter;
