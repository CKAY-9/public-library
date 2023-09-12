import Header from "@/components/header/header";
import {getInstanceInfo} from "@/data/instance";
import {getLibraries} from "@/data/libraries";
import {Library} from "@prisma/client";
import {Metadata} from "next";
import {LibraryPreview} from "./client";
import style from "./index.module.scss";

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
                {libraries.length <= 0 ? <h2>No libraries found</h2> : <h2>Libraries</h2>}
                <div className={style.libraries}>
                    {libraries.map((lib: Library, index: number) => {
                        return (
                            <LibraryPreview lib={lib} key={index} />
                        );
                    })}
                </div>
            </main>
        </>
    );
}

export default Home;
