import express from "express";
import { postMessage, getMessages } from "../controllers/chatController";

const chatRouter = express.Router();

chatRouter.get("/", getMessages);
chatRouter.post("/", postMessage);

export default chatRouter;
