"use client"

import { LibFile, Profile } from "@/app/api/dto";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import style from "./profile.module.scss";
import libStyle from "../../library/[id]/lib.module.scss";
import { lib } from "crypto-js";

const WorkPreview = (props: {
    work: string
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [work, setWork] = useState<LibFile>();

    useEffect(() => {
        (async () => {
            const request = await axios({
                "url": "/api/libs/file",
                "method": "GET",
                "params": {
                    "work": props.work
                }
            });

            setWork(request.data);
            setLoading(false);
        })();
    }, [props.work]);

    if (loading) {
        return (
            <span>Loading</span>
        );
    }

    if (work === undefined) {
        return (
            <></>
        );
    }

    return (
        <Link href="/" className={libStyle.work}>
            {work.cover !== "" &&
                <Image src={``} alt={"Cover"} sizes="100%" width={0} height={0} />
            }
            <section style={{"display": "flex", "justifyContent": "space-between"}}>
            <span>Likes: {work.likes.length}</span>
            <span>Dislikes: {work.dislikes.length}</span>
            </section>
            <h3>{work.title}</h3>
            <p>{work.description.slice(0, 75 > work.description.length ? work.description.length : 75)}...</p>
        </Link>
    );
}

const ProfileClient = (props: {
    profile: Profile
}) => {
    return (
        <>
            {props.profile.finished.length >= 1 && <>
                <h2>Finished</h2>
                <div className={libStyle.works}>
                    {props.profile.finished.map((entry: string, index: number) => {
                        return (
                            <WorkPreview key={index} work={entry} />
                        );
                    })}
                </div>
            </>}
            {props.profile.reading.length >= 1 && <>
                <h2>Reading</h2>
                <div className={libStyle.works}>
                    {props.profile.reading.map((entry: string, index: number) => {
                        return (
                            <WorkPreview key={index} work={entry} />
                        );
                    })}
                </div>
            </>}
            {props.profile.going_to_read.length >= 1 && <>
                <h2>Going to Read</h2>
                <div className={libStyle.works}>
                    {props.profile.going_to_read.map((entry: string, index: number) => {
                        return (
                            <WorkPreview key={index} work={entry} />
                        );
                    })}
                </div>
            </>}
        </>
    );
}

export default ProfileClient;