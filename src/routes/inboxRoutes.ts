import express from "express";
import { getPrestadorInboxMessages, getUsuarioInboxMessages } from "../controllers/inboxController";

const inboxRouter = express.Router();

inboxRouter.get("/prestador", getPrestadorInboxMessages);
inboxRouter.get("/usuario", getUsuarioInboxMessages);

export default inboxRouter;
