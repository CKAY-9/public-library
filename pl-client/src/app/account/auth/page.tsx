import Header from "@/components/header/header";
import {getInstanceInfo} from "@/data/instance";
import AuthorizationClient from "./client";

export const generateMetadata = async (): Promise<Metadata> => {
    const info = await getInstanceInfo();
    return {
        "title": "Account Auth - " + info.instance_name,
        "description": info.instance_description
    }
}

const Authorization = async () => {
    const info = await getInstanceInfo();

    return (
        <>
            <Header instanceInfo={info}></Header>
            <main className="container">
                <AuthorizationClient />
            </main>
        </>
    );
}

export default Authorization;
