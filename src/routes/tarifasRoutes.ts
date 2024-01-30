import express from "express";
import { getTarifas, postTarifas } from "../controllers/tarifasController";

const tarifasRouter = express.Router();

tarifasRouter.get("/", getTarifas);
tarifasRouter.post("/", postTarifas);

export default tarifasRouter;
