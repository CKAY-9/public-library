import { Request, Router } from "express";
import { UserAuthDTO } from "./users.dto";
import { prismaClient } from "../../db/prisma";
import { SHA256 } from "crypto-js";

export const usersRouter = Router();

// Helpers
export const isUserAdmin = async (req: Request): Promise<boolean> => {
    const token: string = (req.headers.authorization as string);
    
    if (token === undefined || token.length <= 0) {
        return false;
    }

    const user = await prismaClient.libUser.findFirst({
        "where": {
            "token": token
        }
    });

    if (user === null) {
        return false
    }
    
    return user.admin;
}

// Middleware
const authMiddleware = (req: Request): boolean => {
    const user = req.method === "GET" ? req.query : req.body;
    return (user.username !== undefined && user.username.length >= 3 && user.password !== undefined && user.password.length >= 8);
}

usersRouter.use("/new", (req, res, next) => {
    if (req.method !== "POST") return;
    if (!authMiddleware(req)) {
        return res.status(400).json({"message": "Failed to meet user information criteria"});
    }
    next();
});
usersRouter.use("/login", (req, res, next) => {
    if (req.method !== "GET") return;
    if (!authMiddleware(req)) {
        return res.status(400).json({"message": "Failed to meet user information criteria"});
    }
    next();
});

// Routes
usersRouter.post("/new", async (req, res) => {
    console.log(req.body);
    const user: UserAuthDTO = req.body;
    const verify = await prismaClient.libUser.findFirst({
        "where": {
            "username": user.username
        }
    });

    if (verify !== null) {
        return res.status(401).json({"message": "Username must be unique!"});
    }

    const token = SHA256(user.username + user.password).toString();
    const insert = await prismaClient.libUser.create({
        "data": {
            "admin": false,
            "token": token,
            "username": user.username
        }
    });
    return res.status(200).json({"message": "Created library user", "token": token});
});

usersRouter.get("/login", async (req, res) => {
    const user: UserAuthDTO = (req.query as any);
    const token = SHA256(user.username + user.password).toString();

    const userCheck = await prismaClient.libUser.findFirst({
        "where": {
            "token": token
        }
    });

    if (userCheck === null) {
        return res.status(400).json({"message": "Incorrect login"});
    }

    return res.status(200).json({"message": "Logged in", "token": token});
});