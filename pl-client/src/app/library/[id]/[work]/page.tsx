import { getInstanceInfo } from "@/data/instance";
import { Metadata } from "next";
import WorkServer from "./server";
import { getLibraryInfo } from "@/data/libraries";

export const generateMetadata = async ({params}: {
    params: {
        id: number,
        work: number
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
        id: number,
        work: number
    }
}) => {
    return (
        <>
            <WorkServer work={params.work} id={params.id}></WorkServer>
        </>
    )
}

export default LibraryPage;