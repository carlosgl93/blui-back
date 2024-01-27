import express from "express";
import { getComunas } from "../controllers/comunasController";

const comunasRouter = express.Router();

comunasRouter.get("/", getComunas);

export default comunasRouter;
