import Header from "@/components/header/header";
import { getInstanceInfo } from "@/data/instance";
import { getLibraryEntry, getLibraryInfo, libraryFromSlug } from "@/data/libraries";
import Image from "next/image";
import { redirect } from "next/navigation";
import style from "./work.module.scss";
import Link from "next/link";
import WorkClient from "./client";

const WorkServer = async (props: {
    id: number,
    work: number
}) => {
    const hostInfo = await libraryFromSlug(props.id);
    const libInfo = await getLibraryInfo(props.id);

    if (libInfo === null) {
        redirect("/");
    }

    const content = await getLibraryEntry(hostInfo, props.work);
    
    if (content === null) {
        redirect(`/library/${props.id}`);
    }

    const info = await getInstanceInfo();

    return (
        <>
            <Header instanceInfo={info}></Header>
            <main className="container">
                <div className={style.work}>
                    {content.cover !== "" && 
                        <Image className={style.cover} src={`${hostInfo.host}/${content.cover}`} alt="Cover" sizes="100%" width={0} height={0} />
                    }
                    <h1>{content.title}</h1>
                    <span>Author: ...</span>
                    <span>Published: ...</span>
                    <span>From: <Link href={hostInfo.host}>{libInfo.name}</Link> (<Link href={`/library/${props.id}`}>View more on {info.instance_name}</Link>)</span>
                    <WorkClient id={props.id} content={content}></WorkClient>
                </div>
            </main>
        </>
    );
}

export default WorkServer;