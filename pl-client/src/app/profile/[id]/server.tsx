import Header from "@/components/header/header";
import { getInstanceInfo } from "@/data/instance";
import { getProfile } from "@/data/user";
import { redirect } from "next/navigation";
import ProfileClient from "./client";

const ProfileServer = async (props: {
    userID: number
}) => {
    const info = await getInstanceInfo();
    const profile = await getProfile(Number.parseInt(props.userID.toString()));

    if (profile === null) {
        redirect("/");
    }
    
    return (
        <>
            <Header instanceInfo={info}></Header>
            <main className="container">
                <h1>{profile.username}</h1>
                {profile.admin && <h3 style={{"color": "red"}}>Admin</h3>}
                <ProfileClient profile={profile} />
            </main>
        </>
    );
}

export default ProfileServer;