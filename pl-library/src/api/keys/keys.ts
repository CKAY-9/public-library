import { Router } from "express";
import { prismaClient } from "../../db/prisma";
import { NewKeyDTO, UpdateKeyDTO } from "./keys.dto";
import { SHA256 } from "crypto-js";
import { isUserAdmin } from "../users/users";

export const keysRouter = Router();

// Helpers
const doesKeyExist = async (key: string): Promise<boolean> => {
    if (key === undefined || key.length <= 0) {
        return false;
    }

    const keyEntry = await prismaClient.key.findFirst({
        "where": {
            "key": key
        }
    });

    return keyEntry !== null;
}

// Routes
keysRouter.post("/generate", async (req, res) => {
    const token: string = (req.headers.authorization as string);

    if (token === undefined || token.length <= 0) {
        return res.status(401).json({"message": "Failed to get user token"});
    }

    const user = await prismaClient.libUser.findFirst({
        "where": {
            "token": token
        }
    });

    if (user === null) {
        return res.status(401).json({"message": "Invalid user token"});
    }

    const newKey: NewKeyDTO = req.body;

    if (newKey.host === undefined) {
        return res.status(400).json({"message": "Failed to get host"});
    }

    const key = SHA256(newKey.host + (Math.random() * Number.MAX_SAFE_INTEGER) + (Math.random() * Math.random()).toString()).toString();
    const insert = await prismaClient.key.create({
        "data": {
            "approved": false,
            "host": newKey.host,
            "key": key,
            "owner": user.id
        }
    });
    return res.status(200).json({"message": "Created new key"});
});

keysRouter.put("/update", async (req, res) => {
    const token: string = (req.headers.authorization as string);

    if (token === undefined || token.length <= 0) {
        return res.status(401).json({"message": "Failed to get user token"});
    }

    const user = await prismaClient.libUser.findFirst({
        "where": {
            "token": token
        }
    });

    if (user === null) {
        return res.status(401).json({"message": "Invalid user token"});
    }

    const info: UpdateKeyDTO = req.body;

    if (!(await doesKeyExist(info.key))) {
        return res.status(404).json({"message": "Failed to find entry with given key"});
    }

    const updateKey = await prismaClient.key.update({
        "where": {
            "key": info.key,
            "host": info.host,
            "id": info.id,
            "owner": user.id
        },
        "data": {
            "host": info.new_host,
        }
    });
    return res.status(200).json({"message": "Updated key"});
})

keysRouter.put("/approve", async (req, res) => {
    if (!(await isUserAdmin(req))) {
        return res.status(401).json({"message": "Insufficient permissions"});
    }

    const id: number = req.body.id;
    const keyUpdate = await prismaClient.key.update({
        "where": {
            "id": id
        },
        "data": {
            "approved": {
                "set": true
            }
        }
    });
    return res.status(200).json({"message": "Updated key"});
});

keysRouter.delete("/remove", async (req, res) => {
    if (!(await isUserAdmin(req))) {
        return res.status(401).json({"message": "Insufficient permissions"});
    }

    const key: string = req.body.key;

    if (!(await doesKeyExist(key))) {
        return res.status(404).json({"message": "Failed to find entry with given key"});
    }

    const keyRemove = await prismaClient.key.delete({
        "where": {
            "key": key
        }
    });
    return res.status(200).json({"message": "Deleted instance key"});
});