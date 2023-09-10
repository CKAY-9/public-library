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
            "token": token
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
