import Header from "@/components/header/header";
import {getInstanceInfo} from "@/data/instance";
import AuthorizationClient from "./client";
import { Metadata } from "next";
import { getSelfWithToken, getToken } from "@/data/user";
import { redirect } from "next/navigation";

export const generateMetadata = async (): Promise<Metadata> => {
    const info = await getInstanceInfo();
    return {
        "title": "Account Auth - " + info.instance_name,
        "description": info.instance_description
    }
}

const Authorization = async () => {
    const info = await getInstanceInfo();
    const user = await getSelfWithToken(getToken() || "");

    if (user !== null) {
        redirect("/");
    }

    return (
        <>
            <Header user={user} instanceInfo={info}></Header>
            <main className="container">
                <AuthorizationClient />
            </main>
        </>
    );
}

export default Authorization;
