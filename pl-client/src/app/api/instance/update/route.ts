import {prisma} from "@/data/prisma";
import {getSelfWithToken} from "@/data/user";
import { Library } from "@prisma/client";
import {NextResponse} from "next/server";

export const PUT = async (request: Request) => {
    const req: {
        name: string,
        desc: string,
        repo: string
        libs: Library[]
    } = await request.json();
    const userToken = request.headers.get("Authorization");

    if (userToken === null) {
        return NextResponse.json({"message": "No user token provided"});
    }

    const user = await getSelfWithToken(userToken);

    if (user === null) {
        return NextResponse.json({"message": "Invalid user token"});
    }

    if (!user.admin) {
        return NextResponse.json({"message": "User must be admin to update instance!"});
    }

    const removeLibs = await prisma.library.deleteMany();
    const insertLibs = await prisma.library.createMany({
        "data": req.libs
    });

    const updateInstance = await prisma.config.update({
        "data": {
            "instance_name": {
                "set": req.name
            },
            "instance_description": {
                "set": req.desc
            },
            "instance_repo": {
                "set": req.repo
            }
        },
        "where": {
            "id": 1
        }
    });

    return NextResponse.json({"message": "Updated"});
}
