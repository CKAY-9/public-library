import LibraryServer from "./server";
import { getInstanceInfo } from "@/data/instance";
import { getLibraryInfo } from "@/data/libraries";
import { Metadata } from "next";

export const generateMetadata = async ({params}: {
    params: {
        id: number
    }
}): Promise<Metadata> => {
    const info = await getInstanceInfo();
    const libInfo = await getLibraryInfo(params.id);
    return {
        "title": libInfo?.name + " - " + info.instance_name,
        "description": info.instance_description
    }
}

const LibraryPage = ({params}: {
    params: {
        id: number
    }
}) => {
    return (
        <>
            <LibraryServer id={params.id}></LibraryServer>
        </>
    )
}

export default LibraryPage;