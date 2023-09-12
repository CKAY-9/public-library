import { libraryFromSlug } from "@/data/libraries";
import axios from "axios";
import { NextResponse } from "next/server";

interface IncomingReq {
    file_id: number,
    host: number
}

export const GET = async (request: Request) => {
    try {
        const req: IncomingReq = await request.json();
        const hostInfo = await libraryFromSlug(req.host);

        const getComments = await axios({
            "url": hostInfo.host + "/api/comments/get",
            "method": "GET",
            "headers": {
                "Authorization": hostInfo.key
            },
            "params": {
                "file_id": req.file_id
            }
        });
    
        return NextResponse.json(getComments.data);
    } catch (ex) {
        return NextResponse.json([]);
    }
}