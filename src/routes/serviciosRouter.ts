import express from "express";
import { getServicios } from "../controllers/serviciosController";

const serviciosRouter = express.Router();

serviciosRouter.get("/", getServicios);

export default serviciosRouter;
