import {prisma} from "@/data/prisma";
import {verifyUserToken} from "@/data/user";
import {SHA256} from "crypto-js";
import {NextResponse} from "next/server"

export const POST = async (request: Request) => {
    const req = await request.json();
    const username: string = (req.username as string) || "";
    const password: string = (req.password as string) || "";

    if (username.length < 2 || password.length < 8) {
        return NextResponse.json({"message": "Password must be at least 8, Username must be at least 3"});
    }

    const usernameCheck = await prisma.user.findFirst({
        "where": {
            "username": username
        }
    });

    if (usernameCheck !== null) {
        return NextResponse.json({"message": "Account already exists!"});
    }

    const token = SHA256(username + password).toString();
    const verify = await verifyUserToken(token);

    if (verify) {
        return NextResponse.json({"message": "Account already exists!"});
    }

    const insert = await prisma.user.create({
        "data": {
            "token": token,
            "username": username,
            "finished": [],
            "going_to_read": [],
            "reading": []
        }
    });

    return NextResponse.json({"message": "Created account", "user_token": token});
}
