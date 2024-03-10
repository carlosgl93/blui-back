import express from "express";
import { get, post } from "../controllers/cuentaBancariaController";

const cuentaBancariaRouter = express.Router();

// Controllers
cuentaBancariaRouter.get("/", get);

cuentaBancariaRouter.post("/", post);

export default cuentaBancariaRouter;
