import Header from "@/components/header/header";
import {getInstanceInfo} from "@/data/instance";
import {getSelfWithToken, getToken, verifyUserToken} from "@/data/user";
import {Metadata} from "next";
import {redirect} from "next/navigation";
import AccountClient from "./client";

export const generateMetadata = async (): Promise<Metadata> => {
    const info = await getInstanceInfo();
    return {
        "title": "Account - " + info.instance_name,
        "description": info.instance_description
    }
}

const Account = async () => {
    const info = await getInstanceInfo();
    if (getToken() === null) {
        redirect("/account/auth"); 
        return;
    }
    const user = await getSelfWithToken(getToken() || "");
    if (user === null) {
        redirect("/account/auth");
        return;
    }

    return (
        <>
            <Header instanceInfo={info}></Header>
            <main className="container">
                <AccountClient instanceInfo={info} userInfo={user}></AccountClient>
            </main>
        </>
    );
}

export default Account;
