import { Router } from "express";
import { prismaClient } from "../../db/prisma";
import { LibInfo } from "@prisma/client";

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

libraryRouter.get("/info", async (req, res) => {
    const info = await getLibraryInfo();
    return res.status(200).json(info);
});