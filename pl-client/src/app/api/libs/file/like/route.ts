import { Like } from "@/app/api/dto";
import { prisma } from "@/data/prisma";
import { getSelfWithToken } from "@/data/user";
import axios from "axios";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    const req: Like = await request.json();
    const userToken = request.headers.get("Authorization");

    if (userToken === null) {
        return NextResponse.json({"message": "No user token provided"});
    }

    const user = await getSelfWithToken(userToken);

    if (user === null) {
        return NextResponse.json({"message": "Invalid user token"});
    }

    const lib = await prisma.library.findUnique({
        "where": {
            "id": req.lib || 0
        }
    });

    if (lib === null) {
        return NextResponse.json({"message": "Invalid library ID"});
    }

    const updateLibrary = await axios({
        "url": lib.host + "/api/files/like",
        "method": "POST",
        "headers": {
            "Authorization": lib.key
        },
        "data": {
            "work": req.work,
            "user": user.id
        }
    });

    return NextResponse.json({"message": "Liked file"});
}