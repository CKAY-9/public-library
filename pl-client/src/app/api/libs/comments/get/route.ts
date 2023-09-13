import { libraryFromSlug } from "@/data/libraries";
import axios from "axios";
import { NextResponse } from "next/server";

interface IncomingReq {
    file_id: number,
    host: number
}

export const GET = async (request: Request) => {
    try {
        const url = new URL(request.url);
        const req = url.searchParams;
        const host: number = Number.parseInt(req.get("host") || "0");

        if (host === 0) {
            return NextResponse.json([]);
        }

        const fileID: number = Number.parseInt(req.get("file_id") || "0");

        if (fileID === 0) {
            return NextResponse.json([]);
        }        

        const hostInfo = await libraryFromSlug(host);

        const getComments = await axios({
            "url": hostInfo.host + "/api/comments/get",
            "method": "GET",
            "headers": {
                "Authorization": hostInfo.key
            },
            "params": {
                "file_id": fileID
            }
        });
    
        return NextResponse.json(getComments.data);
    } catch (ex) {
        return NextResponse.json([]);
    }
}