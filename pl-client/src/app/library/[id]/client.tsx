"use client"

import style from "./lib.module.scss";
import { LibFile } from "@/app/api/dto"
import { Libraries } from "@prisma/client"
import Image from "next/image"

export const WorkPreviewClient = () => {
    return (
        <>
        </>
    )
}

const LibraryContents = (props: {
    contents: LibFile[],
    host: Libraries
}) => {
    return (
        <div className={style.works}>
            {props.contents.map((file: LibFile, index: number) => {
                return (
                    <div className={style.work} key={index}>
                        {file.cover !== "" &&
                            <Image src={`${props.host.host}/${file.cover}`} alt={file.cover} sizes="100%" width={0} height={0} />
                        }
                        <h3>{file.title}</h3>
                        <p>{file.description}</p>
                    </div>
                )
            })}
        </div>
    );
}

export default LibraryContents;