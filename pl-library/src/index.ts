import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { apiRouter } from "./api/api";
import { prismaClient } from "./db/prisma";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api", apiRouter);

// Dashboard
app.set("view engine", "ejs");
app.use("/static", express.static(path.join(__dirname, "../public")))

app.get("/", async (req, res) => {
    const user = await prismaClient.libUser.findFirst({
        "where": {
            "token": req.cookies.token
        }
    });

    const keys = await prismaClient.key.findMany({
        "where": {
            "owner": user.id || 0
        }
    });

    res.render("../pages/index", {
        user,
        "keys": keys
    });
});

const PORT = Number.parseInt(process.env.LIB_PORT) || 3001;
app.listen(PORT, () => {
    console.log("Started Library on port " + PORT);
})