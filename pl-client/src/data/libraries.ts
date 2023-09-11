import {NextResponse} from "next/server";
import {prisma} from "./prisma"

export const getLibraries = async () => {
    return (await prisma.libraries.findMany());
}
