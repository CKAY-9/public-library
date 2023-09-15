"use client"

import WorkPreview from "@/components/work/preview";
import style from "./lib.module.scss";
import { LibFile } from "@/app/api/dto"
import { Library } from "@prisma/client"
import Image from "next/image"
import Link from "next/link";
import { BaseSyntheticEvent, useState } from "react";

const LibraryContents = (props: {
    contents: LibFile[],
    host: Library,
    id: number
}) => {
    const [search, setSearch] = useState<string>("");

    return (
        <>
            <input type="text" placeholder="Search by name" onChange={(e: BaseSyntheticEvent) => setSearch(e.target.value)} />
            <div className={style.works}>
                {props.contents.filter((w) => w.title.toLowerCase().includes(search.toLowerCase())).map((file: LibFile, index: number) => {
                    return (
                        <WorkPreview key={index} file={file} host={props.host}></WorkPreview>
                    )
                })}
            </div>
        </>
    );
}

export default LibraryContents;