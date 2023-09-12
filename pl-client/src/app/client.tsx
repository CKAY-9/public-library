"use client";

import {Libraries} from "@prisma/client";
import axios from "axios";
import {useEffect, useState} from "react";
import { LibInfo } from "./api/dto";
import style from "./index.module.scss";
import Link from "next/link";

export const LibraryPreview = (props: {
    lib: Libraries
}) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [libInfo, setLibInfo] = useState<LibInfo | undefined>(undefined);

    useEffect(() => {
        (async() => {
            const request = await axios({
                "url": props.lib.host + "/api/library/info",
                "method": "GET",
            });

            setLoading(false);
            setLibInfo(request.data);
        })();
    });

    if (loading) {
        return (<span>Loading...</span>);
    }

    if (libInfo === undefined) {
        return (<></>)
    }

    return (
        <Link href={`/library/${libInfo.id}`} className={style.library}>
            <h3>{libInfo.name}</h3>
            <p>{libInfo.description}</p>
            <Link href={props.lib.host}>Visit Host Site</Link>
        </Link>     
    );
}