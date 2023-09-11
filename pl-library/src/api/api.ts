import { Router } from "express";
import { userRouter } from "./users/users";
import { commentsRouter } from "./comments/comments";
import { filesRouter } from "./files/files";
import { keysRouter } from "./keys/keys";

export const apiRouter = Router();

apiRouter.use("/user", userRouter);
apiRouter.use("/comments", commentsRouter);
apiRouter.use("/files", filesRouter);
apiRouter.use("/keys", keysRouter);