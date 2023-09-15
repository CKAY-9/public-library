import { getLibraryInfo } from "@/data/libraries";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
    const url = new URL(request.url);
    const req = url.searchParams;
    const libID: number = Number.parseInt(req.get("id") || "0");
    const lib = await getLibraryInfo(libID, false);
    return NextResponse.json({"lib": lib});
}