import Header from "@/components/header/header";
import {getInstanceInfo} from "@/data/instance";
import {Metadata} from "next";

export const generateMetadata = async (): Promise<Metadata> => {
    const info = await getInstanceInfo();
    return {
        "title": info.instance_name,
        "description": info.instance_description
    }
}

const Home = async () => {
    const info = await getInstanceInfo();

    return (
        <>
            <Header instanceInfo={info}></Header>
            <main className="container">
                <h1>Browse</h1>
            </main>
        </>
    );
}

export default Home;
