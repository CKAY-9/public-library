"use client"

import { LibFile, Profile } from "@/app/api/dto";
import axios from "axios";
import { useEffect, useState } from "react";

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
        <div>
        </div>
    );
}

const ProfileClient = (props: {
    profile: Profile
}) => {
    return (
        <>
            {props.profile.finished.length >= 1 && <>
                <h2>Finished</h2>
                {props.profile.finished.map((entry: string, index: number) => {
                    return (
                        <WorkPreview key={index} work={entry} />
                    )
                })}
            </>}
            {props.profile.reading.length >= 1 && <>
                <h2>Reading</h2>
                {props.profile.reading.map((entry: string, index: number) => {
                    return (
                        <WorkPreview key={index} work={entry} />
                    )
                })}
            </>}
            {props.profile.going_to_read.length >= 1 && <>
                <h2>Going to Read</h2>
                {props.profile.going_to_read.map((entry: string, index: number) => {
                    return (
                        <WorkPreview key={index} work={entry} />
                    )
                })}
            </>}
        </>
    );
}

export default ProfileClient;