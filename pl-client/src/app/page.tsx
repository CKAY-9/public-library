import Header from "@/components/header/header";
import {getInstanceInfo} from "@/data/instance";
import {getLibraries} from "@/data/libraries";
import {Library} from "@prisma/client";
import {Metadata} from "next";
import {LibrariesClient, LibraryPreview, UserPreview, UsersClient} from "./client";
import style from "./index.module.scss";
import { getProfiles, getSelfWithToken, getToken } from "@/data/user";
import { Profile } from "./api/dto";
import axios from "axios";
import { BASE_URL } from "./api/resources";

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
    const libInfoArr = [];

    for (let i = 0; i < libraries.length; i++) {
        try {
            const req = await axios({
                "url": BASE_URL + "/api/libs/info",
                "method": "GET",
                "params": {
                    "id": libraries[i].id,
                },
                "headers": {
                    "Authorization": libraries[i].key
                }
            });
    
            libInfoArr.push(req.data.lib);
        } catch (ex: any) {
            console.error(ex.toString());
        }
    }

    return (
        <>
            <Header user={user} instanceInfo={info}></Header>
            <main className="container">
                <h1>Browse</h1>
                <LibrariesClient libraries={libInfoArr}></LibrariesClient>
                <UsersClient users={users}></UsersClient>
            </main>
        </>
    );
}

export default Home;
