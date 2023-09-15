import Header from "@/components/header/header";
import {getInstanceInfo} from "@/data/instance";
import {getLibraries} from "@/data/libraries";
import {Library} from "@prisma/client";
import {Metadata} from "next";
import {LibraryPreview, UserPreview} from "./client";
import style from "./index.module.scss";
import { getProfiles, getSelfWithToken, getToken } from "@/data/user";
import { Profile } from "./api/dto";

export const generateMetadata = async (): Promise<Metadata> => {
    const info = await getInstanceInfo();
    return {
        "title": info.instance_name,
        "description": info.instance_description
    }
}

const Home = async () => {
    const info = await getInstanceInfo();
    const libraries = await getLibraries();
    const users = await getProfiles();
    const user = await getSelfWithToken(getToken() || "");

    return (
        <>
            <Header user={user} instanceInfo={info}></Header>
            <main className="container">
                <h1>Browse</h1>
                {libraries.length <= 0 ? <h2>No libraries found</h2> : <h2>Libraries</h2>}
                <div className={style.libraries}>
                    {libraries.map((lib: Library, index: number) => {
                        return (
                            <LibraryPreview id={lib.id} key={index} />
                        );
                    })}
                </div>
                {users.length <= 0 ? <h2>No users found</h2> : <h2>Users</h2>}
                <div className={style.users}>
                    {users.map((user: Profile, index: number) => {
                        return (
                            <UserPreview key={index} user={user} />
                        )
                    })}
                </div>
            </main>
        </>
    );
}

export default Home;
