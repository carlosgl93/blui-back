import express from "express";
import { getTarifas, postFreeMeetGreet, postTarifas } from "../controllers/tarifasController";

const tarifasRouter = express.Router();

tarifasRouter.get("/", getTarifas);
tarifasRouter.post("/", postTarifas);
tarifasRouter.post("/freeMeetGreet", postFreeMeetGreet);


export default tarifasRouter;
