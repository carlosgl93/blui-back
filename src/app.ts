import express from "express";
import dotenv from "dotenv";
// import { info } from "./utils/logger";

const cors = require("cors");

import { connectDb } from "./db/db";

import userRouter from "./routes/userRoutes";
import prestadoresRouter from "./routes/prestadoresRoutes";
import comunasRouter from "./routes/comunasRoutes";
import serviciosRouter from "./routes/serviciosRouter";
import chatRouter from "./routes/chatRoutes";
import inboxRouter from "./routes/inboxRoutes";
import disponibilidadRouter from "./routes/disponibilidadRoutes";
import logPathMiddleware from "./middlewares/logPath";
import tarifasRouter from "./routes/tarifasRoutes";
import { unknownEndpoint } from "./middlewares/unknownEndpoint";
import experienceRouter from "./routes/experience";
import cuentaBancariaRouter from "./routes/cuentaBancariaRoutes";
import historialLaboralRouter from "./routes/historialLaboralRoutes";
import educacionRouter from "./routes/educacionRoutes";

export const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
// app.use(info);

connectDb();

app.use(logPathMiddleware);

app.use("/users", userRouter);
app.use("/prestadores", prestadoresRouter);
app.use("/comunas", comunasRouter);
app.use("/servicios", serviciosRouter);
app.use("/chat", chatRouter);
app.use("/inbox", inboxRouter);
app.use("/disponibilidad", disponibilidadRouter);
app.use("/tarifas", tarifasRouter);
app.use("/experience", experienceRouter);
app.use("/cuentaBancaria", cuentaBancariaRouter);
app.use("/historialLaboral", historialLaboralRouter);
app.use("/educacion", educacionRouter);


app.use(unknownEndpoint);



