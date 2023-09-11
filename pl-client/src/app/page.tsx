import Header from "@/components/header/header";
import {getInstanceInfo} from "@/data/instance";
import {getLibraries} from "@/data/libraries";
import {Libraries} from "@prisma/client";
import {Metadata} from "next";
import {LibraryPreview} from "./client";

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

    return (
        <>
            <Header instanceInfo={info}></Header>
            <main className="container">
                <h1>Browse</h1>
                {libraries.length <= 0 && <h3>No libraries found</h3>}
                {libraries.map((lib: Libraries, index: number) => {
                    return (
                        <>
                            <h2>Libraries</h2>
                            <LibraryPreview lib={lib} key={index} />
                            <h2>All</h2>
                        </>
                    );
                })}
            </main>
        </>
    );
}

export default Home;
