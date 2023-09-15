"use client";

import axios from "axios";
import {useEffect, useState} from "react";
import { LibInfo, Profile } from "./api/dto";
import style from "./index.module.scss";
import Link from "next/link";

export const UserPreview = (props: {
    user: Profile
}) => {
    return (
        <Link href={`/profile/${props.user.id}`} className={style.user}>
            <h3>{props.user.username}</h3>
            {props.user.admin && <span style={{"color": "red"}}>Admin</span>}
        </Link>
    )
}

export const LibraryPreview = (props: {
    id: number
}) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [libInfo, setLibInfo] = useState<LibInfo | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const request = await axios({
                    "url": "/api/libs/info",
                    "method": "GET",
                    "params": {
                        "id": props.id,
                    }
                });
    
                setLibInfo(request.data.lib);
            } catch (ex) {
                setLibInfo(null);
            }

            setLoading(false);
        })();
    }, [props.id]);

    if (loading) {
        return (<span>Loading...</span>);
    }

    if (libInfo === null) {
        return (<></>)
    }

    return (
        <Link href={`/library/${props.id}`} className={style.library}>
            <h3>{libInfo.name}</h3>
            <p>{libInfo.description}</p>
        </Link>     
    );
}
