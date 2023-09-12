import Header from "@/components/header/header";
import { getInstanceInfo } from "@/data/instance";
import { getLibraryInfo } from "@/data/libraries";
import { redirect } from "next/navigation";

const LibraryServer = async (props: {
    id: number
}) => {
    const libraryInfo = await getLibraryInfo(props.id);
    const info = await getInstanceInfo();

    if (libraryInfo === null) {
        redirect("/");
    }

    return (
        <>
            <Header instanceInfo={info}></Header>
            <main className="container">
                <h1>Library: {libraryInfo.name}</h1>
                <div>
                    <span>Description:</span>
                    <p>{libraryInfo.description}</p>
                </div>
            </main>
        </>
    );
}

export default LibraryServer;