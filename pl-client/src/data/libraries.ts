import {prisma} from "./prisma"
import axios, { AxiosResponse } from "axios";
import { LibFile, LibInfo } from "@/app/api/dto";
import { Library } from "@prisma/client";

export const getLibraries = async () => {
    return (await prisma.library.findMany());
}

export const libraryFromSlug = async (id: number) => {
    return (await getLibraries())[id - 1];
}

export const libraryFromID = async (id: number) => {
    const lib = await prisma.library.findUnique({
        "where": {
            "id": id
        }
    });
    return lib;
}

export const getLibraryEntry = async (libHost: Library, id: number): Promise<LibFile | null> => {
    try {
        const request: AxiosResponse<LibFile> = await axios({
            "url": libHost.host + "/api/files/get",
            "headers": {
                "Authorization": libHost.key
            },
            "params": {
                "id": id
            }
        });

        return request.data;
    } catch (ex) {
        console.error(ex);
        return null;
    }
}

export const getLibraryContents = async (lib: Library) => {
    try {
        const request: AxiosResponse<LibFile[]> = await axios({
            "url": lib.host + "/api/files/all",
            "method": "GET",
            "headers": {
                "Authorization": lib.key
            }
        });

        return request.data;
    } catch (ex) {
        console.error(ex);
        return null;
    }
}

export const getLibraryInfo = async (id: number) => {
    const lib = await libraryFromSlug(id);

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