import {NextResponse} from "next/server";
import {prisma} from "./prisma"
import axios, { AxiosResponse } from "axios";
import { LibInfo } from "@/app/api/dto";

export const getLibraries = async () => {
    return (await prisma.libraries.findMany());
}

export const getLibraryInfo = async (id: number) => {
    const lib = (await getLibraries())[id - 1];

    try {
        const request: AxiosResponse<LibInfo> = await axios({
            "url": lib.host + "/api/library/info",
            "method": "GET"
        });
    
        return request.data;
    } catch (ex) {
        console.error(ex);
        return null;
    }
}