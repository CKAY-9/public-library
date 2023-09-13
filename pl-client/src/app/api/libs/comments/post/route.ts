import { getSelfWithToken, verifyUserToken } from "@/data/user";
import { NextResponse } from "next/server";
import { NewComment } from "../../../dto";
import { libraryFromSlug } from "@/data/libraries";
import axios from "axios";

export const POST = async (request: Request) => {
    const user = await getSelfWithToken(request.headers.get("Authorization") || "");

    if (user === null) {
        return NextResponse.json({"message": "Failed to authenticate user"});
    }

    const req: NewComment = await request.json();

    if (req.content.length <= 0) {
        return NextResponse.json({"message": "Content must be at least a character long"});
    }

    const hostInfo = await libraryFromSlug(req.host);

    try {
        const postComment = await axios({
            "url": hostInfo.host + "/api/comments/post",
            "method": "POST",
            "headers": {
                "Authorization": hostInfo.key
            },
            "data": {
                "content": req.content,
                "file_id": req.file_id,
                "author": user.id
            }
        });

        return NextResponse.json({"message": "Posted comment"});
    } catch (ex) {
        console.error(ex);
        return NextResponse.json({});
    }
}