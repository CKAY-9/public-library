import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { apiRouter } from "./api/api";
import { prismaClient } from "./db/prisma";
import cookieParser from "cookie-parser";
import path from "path";
import { getLibraryInfo } from "./api/library/library";

const app = express();

app.use(cors());
app.use(bodyParser.json({"limit": "50mb"}));
app.use(cookieParser());
app.use("/api", apiRouter);

// Dashboard
app.set("view engine", "ejs");
app.use("/static", express.static(path.join(__dirname, "../public")))
app.use("/uploads", express.static(path.join(__dirname, "../uploads")))

app.get("/", async (req, res) => {
    const libInfo = await getLibraryInfo();
    const user = await prismaClient.libUser.findFirst({
        "where": {
            "token": req.cookies.token || ""
        }
    });

    let keys = [];

    if (user !== null) {
        keys = await prismaClient.key.findMany({
            "where": {
                "owner": user.id
            }
        });
    }

    res.render("../pages/index", {
        "user": user,
        "keys": keys,
        "library": libInfo
    });
});

app.get("/admin", async (req, res) => {
    const user = await prismaClient.libUser.findFirst({
        "where": {
            "token": req.cookies.token || ""
        }
    });

    if (user === null || !user.admin) {
        return res.send("<h1>Insufficient permissions</h1>");
    }

    const info = await getLibraryInfo();
    const keys = await prismaClient.key.findMany();
    const files = await prismaClient.file.findMany();
    res.render("../pages/admin", {
        user,
        info,
        keys,
        files
    })
})

const PORT = Number.parseInt(process.env.LIB_PORT) || 3001;
app.listen(PORT, () => {
    console.log("Started Library on port " + PORT);
})