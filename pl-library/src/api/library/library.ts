import { Router } from "express";
import { prismaClient } from "../../db/prisma";
import { LibInfo } from "@prisma/client";
import { isUserAdmin } from "../users/users";
import { UpdateLibDTO } from "./library.dto";
import { verifyIncomingHost } from "../api";

export const libraryRouter = Router();

// Helpers 
export const getLibraryInfo = async (): Promise<LibInfo> => {
    let info = await prismaClient.libInfo.findFirst({
        "where": {
            "id": 1
        }
    });
    if (info === null) {
        info = await prismaClient.libInfo.create({
            "data": {
                "name": "PubLib",
                "description": "Public Library by CKAY9"
            }
        });
    }
    return info;
}

// Middleware
libraryRouter.use(async (req, res, next) => {
    const verify = await verifyIncomingHost(req);
    if (!verify) {
        return res.status(401).json({"message": "Invalid key"});
    }
    next();
});

// Routes
libraryRouter.get("/info", async (req, res) => {
    const info = await getLibraryInfo();
    return res.status(200).json(info);
});

libraryRouter.put("/update", async (req, res) => {
    if (!(await isUserAdmin(req))) {
        return res.status(401).json({"message": "Insufficient permissions"});
    }

    const data: UpdateLibDTO = req.body;

    const update = await prismaClient.libInfo.update({
        "data": {
            "name": data.name,
            "description": data.description
        },
        "where": {
            "id": 1
        }
    })
})