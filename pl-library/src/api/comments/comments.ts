import { Router } from "express";
import { verifyIncomingHost } from "../api";
import { prismaClient } from "../../db/prisma";

export const commentsRouter = Router();

commentsRouter.get("/get", async (req, res) => {
    const hostCheck = await verifyIncomingHost(req);
    if (!hostCheck) {
        return res.status(401).json({"message": "Invalid instance key"});
    }

    const comments = await prismaClient.comment.findMany();
    return res.status(200).json({comments});
});