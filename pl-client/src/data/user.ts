import {User} from "@prisma/client";
import {prisma} from "./prisma"
import {cookies} from "next/headers";

export const getToken = (): string | null => {
    const token = cookies().get("user_token");
    return token === undefined ? null : token.value;
}

export const getSelfWithToken = async (token: string): Promise<User | null> => {
    const user = await prisma.user.findFirst({
        "where": {
            "token": token || ""
        }
    });

    return user;
}

export const verifyUserToken = async (token: string): Promise<boolean> => {
    const user = await prisma.user.findFirst({
        "where": {
            "token": token,
        }
    });
    
    return user !== null;
}

export const getProfiles = async () => {
    const profiles = await prisma.user.findMany({
        "select": {
            "admin": true,
            "finished": true,
            "going_to_read": true,
            "id": true,
            "reading": true,
            "username": true
        }
    });
    return profiles;
}

export const getProfile = async (userID: number) => {
    const profile = await prisma.user.findUnique({
        "select": {
            "admin": true,
            "finished": true,
            "going_to_read": true,
            "id": true,
            "reading": true,
            "username": true
        },
        "where": {
            "id": userID
        }
    });

    return profile;
}