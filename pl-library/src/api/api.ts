import { Request, Router } from "express";
import { usersRouter } from "./users/users";
import { commentsRouter } from "./comments/comments";
import { filesRouter } from "./files/files";
import { keysRouter } from "./keys/keys";
import { libraryRouter } from "./library/library";
import { prismaClient } from "../db/prisma";

export const apiRouter = Router();

apiRouter.use("/users", usersRouter);
apiRouter.use("/comments", commentsRouter);
apiRouter.use("/files", filesRouter);
apiRouter.use("/keys", keysRouter);
apiRouter.use("/library", libraryRouter);

export const verifyIncomingHost = async (req: Request) => {
    const host = req.headers.host; 
    const keys = await prismaClient.key.findMany();
    for (let i = 0; i < keys.length; i++) {
        if (host.includes(keys[i].host)) {
            return true;
        }
    }
    return false;
}