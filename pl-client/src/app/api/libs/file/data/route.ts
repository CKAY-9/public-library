import { libraryFromID } from "@/data/libraries";
import axios from "axios";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
    const url = new URL(request.url);
    const req = url.searchParams;
    const hostID: number = Number.parseInt(req.get("host") || "0");

    if (hostID === 0) {
        return NextResponse.json({"message": "Invalid host"});
    }

    const host = await libraryFromID(hostID);

    if (host === null) {
        return NextResponse.json({"message": "Invalid host"});
    }
    
    const workID: number = Number.parseInt(req.get("workID") || "0");

    if (workID === 0) {
        return NextResponse.json({"message": "Invalid work ID"});
    }

    const dataRequest = await axios({
        "url": host.host + "/api/files/raw",
        "method": "GET",
        "headers": {
            "Authorization": host.key
        },
        "params": {
            "workID": workID
        }
    });

    return NextResponse.json({"raw": dataRequest.data.raw});
}