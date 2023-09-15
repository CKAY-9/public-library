import Header from "@/components/header/header";
import { getInstanceInfo } from "@/data/instance";
import { getLibraryContents, getLibraryInfo, libraryFromSlug } from "@/data/libraries";
import { redirect } from "next/navigation";
import LibraryContents from "./client";
import Link from "next/link";
import { getSelfWithToken, getToken } from "@/data/user";

const LibraryServer = async (props: {
    id: number
}) => {
    const libInfo = await getLibraryInfo(props.id);
    
    if (libInfo === null) {
        redirect("/");
    }

    const hostInfo = await libraryFromSlug(props.id);
    const contents = await getLibraryContents(hostInfo);
    const info = await getInstanceInfo();
    const user = await getSelfWithToken(getToken() || "");

    return (
        <>
            <Header user={user} instanceInfo={info}></Header>
            <main className="container">
                <h1>Library: {libInfo.name}</h1>
                <Link href={hostInfo.host}>Visit Host Site</Link>
                <div>
                    <h3>Description</h3>
                    <p>{libInfo.description}</p>
                </div>
                {(contents === null || contents?.length <= 0) && <span>This library has no content!</span>}
                {(contents !== null && contents.length >= 1) && 
                    <>
                        <h3>Contents</h3>
                        <LibraryContents id={props.id} host={hostInfo} contents={contents}></LibraryContents>
                    </>
                }
            </main>
        </>
    );
}

export default LibraryServer;