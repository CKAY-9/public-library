import { Router } from "express";
import { usersRouter } from "./users/users";
import { commentsRouter } from "./comments/comments";
import { filesRouter } from "./files/files";
import { keysRouter } from "./keys/keys";
import { libraryRouter } from "./library/library";

export const apiRouter = Router();

apiRouter.use("/users", usersRouter);
apiRouter.use("/comments", commentsRouter);
apiRouter.use("/files", filesRouter);
apiRouter.use("/keys", keysRouter);
apiRouter.use("/library", libraryRouter);