import { getLibraryEntry } from "@/data/libraries";
import { prisma } from "@/data/prisma";
import axios from "axios";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
    const url = new URL(request.url);
    const req = url.searchParams;
    const work: string | null = req.get("work");

    if (work === null) {
        return NextResponse.json({"message": "Invalid work ID"});
    }

    try {
        const splitWork = work.split("@");
        const fileID: number = Number.parseInt(splitWork[0]);
        const hostName: string = splitWork[1];

        const host = await prisma.library.findFirst({
            "where": {
                "host": hostName
            }
        });

        if (host === null) {
            return NextResponse.json({"message": "Failed to fetch host"});
        }

        const entry = await getLibraryEntry(host, fileID);
        return NextResponse.json(entry);
    } catch (ex) {

    }
}