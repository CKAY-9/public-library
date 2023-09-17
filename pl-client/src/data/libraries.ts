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

export const getRawFile = async (workID: number, host: Library): Promise<string> => {
    try {
        const request = await axios({
            "url": host.host + "/api/files/raw",
            "method": "GET",
            "params": {
                "workID": workID
            },
            "headers": {
                "Authorization": host.key
            }
        });

        return request.data.raw;
    } catch (ex: any) {
        console.error(ex.toString());
        return "";
    }
}

export const getLibraryInfo = async (id: number, slug: boolean = true) => {
    let lib;
    
    if (slug) {
        lib = await libraryFromSlug(id);
    } else {
        lib = await prisma.library.findUnique({
            "where": {
                "id": id
            }
        })
    }

    if (lib === null) {
        return null;
    }

    try {
        const libRequest = await axios({
            "url": lib.host + "/api/library/info",
            "method": "GET",
            "headers": {
                "Authorization": lib.key
            },
            "timeout": 1000 * 10 // 10 seconds
        });
    
        return libRequest.data;
    } catch (ex: any) {
        console.error(ex.toString());
        return null;
    }
}