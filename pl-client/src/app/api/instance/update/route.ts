import {prisma} from "@/data/prisma";
import {getSelfWithToken} from "@/data/user";
import { Libraries } from "@prisma/client";
import {NextResponse} from "next/server";

export const PUT = async (request: Request) => {
    const req: {
        name: string,
        desc: string,
        repo: string
        libs: Libraries[]
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

    const existingLibs = await prisma.libraries.findMany() || []; 
    const toAppendLibs = req.libs.filter((lib, i) => {
        if (i >= existingLibs.length) {
            return true;
        }
        return lib.id === existingLibs[i].id;
    });
    for (let i = 0; i < toAppendLibs.length; i++) {
        const insert = await prisma.libraries.create({
            "data": {
                "host": toAppendLibs[i].host,
                "key": toAppendLibs[i].key
            }
        })
    }

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
