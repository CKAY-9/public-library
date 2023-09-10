import {verifyUserToken} from "@/data/user";
import {SHA256} from "crypto-js";
import {NextResponse} from "next/server";

export const GET = async (request: Request) => {
    const req = await request.json();
    const username: string = (req.username as string) || "";
    const password: string = (req.password as string) || "";
    const token = SHA256(username + password).toString();
    const verify = await verifyUserToken(token);

    if (!verify) {
        return NextResponse.json({"message": "Invalid login"});
    }

    return NextResponse.json({"message": "Login valid", "user_token": token});
}
