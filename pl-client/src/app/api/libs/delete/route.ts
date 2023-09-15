import { NextResponse } from "next/server";
import { DeleteLibrary } from "../../dto";
import { getSelfWithToken } from "@/data/user";
import { prisma } from "@/data/prisma";

export const DELETE = async (request: Request) => {
    const req: DeleteLibrary = await request.json();
    const token: string | null = request.headers.get("Authorization");
    const id = Number.parseInt(req.libraryID || "0");

    if (id === 0) {
        return NextResponse.json({"message": "Invalid library ID"});
    }

    if (token === null) {
        return NextResponse.json({"message": "No user token provided"});
    }

    const user = await getSelfWithToken(token);

    if (user === null) {
        return NextResponse.json({"message": "Invalid user token"});
    }

    if (!user.admin) {
        return NextResponse.json({"message": "User must be admin to update instance!"});
    }

    const lib = await prisma.library.findUnique({
        "where": {
            "id": id
        }
    });

    if (lib === null) {
        return NextResponse.json({"message": "Invalid library ID"});
    }

    const deleteLib = await prisma.library.delete({
        "where": {
            "id": id
        }
    });
    return NextResponse.json({"message": "Deleted library"});
}