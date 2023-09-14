"use client"

import WorkPreview from "@/components/work/preview";
import style from "./lib.module.scss";
import { LibFile } from "@/app/api/dto"
import { Library } from "@prisma/client"
import Image from "next/image"
import Link from "next/link";

const LibraryContents = (props: {
    contents: LibFile[],
    host: Library,
    id: number
}) => {
    return (
        <div className={style.works}>
            {props.contents.map((file: LibFile, index: number) => {
                return (
                    <WorkPreview key={index} file={file} host={props.host}></WorkPreview>
                )
            })}
        </div>
    );
}

export default LibraryContents;