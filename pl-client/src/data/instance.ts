import {Config} from "@prisma/client";
import {prisma} from "./prisma"

export const updateInstanceInfo = async (newInfo: {
    name: string,
    description: string,
    repo: string
}): Promise<Config> => {
    let update = await prisma.config.update({
        "data": {
            "instance_name": {
                "set": newInfo.name
            },
            "instance_description": {
                "set": newInfo.description
            },
            "instance_repo": {
                "set": newInfo.repo
            }
        },
        "where": {
            "id": 1
        }
    });

    return update;
}

export const getInstanceInfo = async (): Promise<Config> => {
    let info = await prisma.config.findFirst();
    if (info === null) 
        info = await prisma.config.create({}); 
    
    return info;
}
