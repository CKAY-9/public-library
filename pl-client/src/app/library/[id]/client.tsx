"use client"

import style from "./lib.module.scss";
import { LibFile } from "@/app/api/dto"
import { Libraries } from "@prisma/client"
import Image from "next/image"
import Link from "next/link";

const LibraryContents = (props: {
    contents: LibFile[],
    host: Libraries,
    id: number
}) => {
    return (
        <div className={style.works}>
            {props.contents.map((file: LibFile, index: number) => {
                return (
                    <Link href={`/library/${props.id}/${file.id}`} className={style.work} key={index}>
                        {file.cover !== "" &&
                            <Image src={`${props.host.host}/${file.cover}`} alt={"Cover"} sizes="100%" width={0} height={0} />
                        }
                        <section style={{"display": "flex", "justifyContent": "space-between"}}>
                            <span>Likes: {0}</span>
                            <span>Dislikes: {0}</span>
                        </section>
                        <h3>{file.title}</h3>
                        <p>{file.description.slice(0, 75 > file.description.length ? file.description.length : 75)}...</p>
                    </Link>
                )
            })}
        </div>
    );
}

export default LibraryContents;