import LibraryServer from "./server";
import { getInstanceInfo } from "@/data/instance";
import { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
    const info = await getInstanceInfo();
    return {
        "title": info.instance_name,
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