import { AddToUserLibrary } from "@/app/api/dto";
import { libraryFromID } from "@/data/libraries";
import { prisma } from "@/data/prisma";
import { getSelfWithToken } from "@/data/user";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    const req: AddToUserLibrary = await request.json();
    const token = request.headers.get("authorization");

    if (token === null) {
        return NextResponse.json({"message": "Failed to get user token"});
    }

    const user = await getSelfWithToken(token);

    if (user === null) {
        return NextResponse.json({"message": "Failed to authenticate user"});
    }

    const libHost = await libraryFromID(req.server);

    if (libHost === null) {
        return NextResponse.json({"message": "Failed to fetch requested library"});
    }

    const entry = `${req.work}@${libHost.host}`.toLowerCase()

    if (user.finished.includes(entry)) {
        return NextResponse.json({"message": "This entry is already in your finished collection"});
    }

    for (let i = 0; i < user.reading.length; i++) {
        if (user.reading[i].toLowerCase() === entry) {
            user.reading.splice(i);
            const removeFromReading = await prisma.user.update({
                "where": {
                    "id": user.id,
                },
                "data": {
                    "reading": {
                        "set": user.reading
                    }
                }
            });
            break;
        }
    }

    for (let i = 0; i < user.going_to_read.length; i++) {
        if (user.going_to_read[i].toLowerCase() === entry) {
            user.going_to_read.splice(i);
            const removeFromGTR = await prisma.user.update({
                "where": {
                    "id": user.id,
                },
                "data": {
                    "going_to_read": {
                        "set": user.going_to_read
                    }
                }
            });
            break;
        }
    }

    user.finished.push(entry);
    const userUpdate = await prisma.user.update({
        "where": {
            "id": user.id
        },
        "data": {
            "finished": user.finished
        }
    });
    return NextResponse.json({"message": "Updated user library"});
}