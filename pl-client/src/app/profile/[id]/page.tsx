import { getInstanceInfo } from "@/data/instance";
import { Metadata } from "next";
import ProfileServer from "./server";
import { getProfile, getSelfWithToken } from "@/data/user";

export const generateMetadata = async ({params}: {
    params: {
        id: number
    }
}): Promise<Metadata> => {
    const info = await getInstanceInfo();
    const user = await getProfile(Number.parseInt(params.id.toString()));

    if (user === null) {
        return {
            "title": info.instance_name,
            "description": info.instance_description
        }
    }

    return {
        "title": `${user.username} - ${info.instance_name}`,
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