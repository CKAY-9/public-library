"use client"

import { LibFileFetch, Profile } from "@/app/api/dto";
import axios from "axios";
import { useEffect, useState } from "react";
import WorkPreview from "@/components/work/preview";
import libStyle from "../../library/[id]/lib.module.scss";

const WorkPreviewProf = (props: {
    work: string
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [work, setWork] = useState<LibFileFetch>();

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
        <WorkPreview file={work.entry} host={{
            "host": work.hostData.host,
            "id": work.hostData.id,
            "key": ""
        }}></WorkPreview>
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
                            <WorkPreviewProf key={index} work={entry} />
                        );
                    })}
                </div>
            </>}
            {props.profile.reading.length >= 1 && <>
                <h2>Reading</h2>
                <div className={libStyle.works}>
                    {props.profile.reading.map((entry: string, index: number) => {
                        return (
                            <WorkPreviewProf key={index} work={entry} />
                        );
                    })}
                </div>
            </>}
            {props.profile.going_to_read.length >= 1 && <>
                <h2>Going to Read</h2>
                <div className={libStyle.works}>
                    {props.profile.going_to_read.map((entry: string, index: number) => {
                        return (
                            <WorkPreviewProf key={index} work={entry} />
                        );
                    })}
                </div>
            </>}
        </>
    );
}

export default ProfileClient;