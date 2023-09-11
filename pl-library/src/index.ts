import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { apiRouter } from "./api/api";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api", apiRouter);

const PORT = Number.parseInt(process.env.LIB_PORT) || 3001;
app.listen(PORT, () => {
    console.log("Started Library on port " + PORT);
})