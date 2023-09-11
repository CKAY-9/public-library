import {prisma} from "@/data/prisma"
import axios from "axios"
import {NextResponse} from "next/server";

export const GET = async () => {
    const libs = await prisma.libraries.findMany({});
    return NextResponse.json(libs);
}
