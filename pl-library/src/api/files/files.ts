import { Router } from "express";
import { NewFileDTO } from "./files.dto";
import multer from "multer";
import { prismaClient } from "../../db/prisma";
import { isUserAdmin } from "../users/users";
import { existsSync, mkdirSync } from "fs";

export const filesRouter = Router();

const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        const data: NewFileDTO = req.body;
        const path = `uploads/${data.title.replace(" ", "-").toLowerCase() || "_"}`;
        if (!existsSync(path)) {
            mkdirSync(path);
        }
        cb(null, path);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * Number.MAX_SAFE_INTEGER);
        cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname);
    }
})
const upload = multer({storage});

// Middleware
filesRouter.use("/upload", async (req, res, next) => {
    if (!(await isUserAdmin(req))) {
        return res.status(401).json({"message": "Insufficient permissions"});
    }
    next();
})

// Routes
filesRouter.post("/upload", upload.fields([
    {
        "name": "work",
        "maxCount": 1
    },
    {
        "name": "cover",
        "maxCount": 1
    }
]), async (req, res) => {
    const uploadData: NewFileDTO = req.body;

    if (req.files["work"][0] === undefined) {
        return res.status(400).json({"message": "Failed to read file"});
    }
    
    const destination = req.files["work"][0].path;
    let coverDestination = "";

    if (req.files["cover"][0] !== undefined) {
        coverDestination = req.files["cover"][0].path;
    }

    const fileInsert = await prismaClient.file.create({
        "data": {
            "title": uploadData.title,
            "description": uploadData.description,
            "dest": destination,
            "cover": coverDestination,
            "rating": []
        }
    });

    return res.status(200).json({"message": "Uploaded file"});
});

filesRouter.get("/all", async (req, res) => {
    const files = await prismaClient.file.findMany();
    return res.status(200).json(files);
});