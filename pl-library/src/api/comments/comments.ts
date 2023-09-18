import { Router } from "express";
import { verifyIncomingHost } from "../api";
import { prismaClient } from "../../db/prisma";
import { NewCommentDTO } from "./comments.dto";

export const commentsRouter = Router();

// Middleware
commentsRouter.use(async (req, res, next) => {
    const hostCheck = await verifyIncomingHost(req);
    if (!hostCheck) {
        return res.status(401).json({"message": "Invalid key"});
    }
    next();
});

// Routes
commentsRouter.get("/get", async (req, res) => {
    const comments = await prismaClient.comment.findMany({
        "where": {
            "file_id": Number.parseInt(req.query.file_id as string || "0")
        }
    });
    return res.status(200).json(comments);
});

commentsRouter.post("/post", async (req, res) => {
    const comment: NewCommentDTO = req.body;

    const host = req.headers.host;
    const author = `${comment.author}@${req.protocol}://${host}`;

    const insertComment = await prismaClient.comment.create({
        "data": {
            "author": author,
            "content": comment.content,
            "file_id": comment.file_id
        }
    });

    return res.status(200).json({"message": "Posted comment"});
});