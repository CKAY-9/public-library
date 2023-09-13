import { getInstanceInfo } from "@/data/instance";
import { Metadata } from "next";
import ProfileServer from "./server";

export const generateMetadata = async ({params}: {
    params: {
        id: number
    }
}): Promise<Metadata> => {
    const info = await getInstanceInfo();
    return {
        "title": info.instance_name,
        "description": info.instance_description
    }
}

const ProfilePage = ({params}: {
    params: {
        id: number
    }
}) => {
    return (
        <>
            <ProfileServer userID={params.id}></ProfileServer>
        </>
    )
}

export default ProfilePage;