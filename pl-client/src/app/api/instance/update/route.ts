import {prisma} from "@/data/prisma";
import {getSelfWithToken} from "@/data/user";
import {NextResponse} from "next/server";

export const PUT = async (request: Request) => {
    const req = await request.json();
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

    console.log(req);

    const update = await prisma.config.update({
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

    console.log(update);

    return NextResponse.json({"message": "Updated"});
}
