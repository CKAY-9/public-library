"use client"; import {Libraries} from "@prisma/client";
import axios from "axios";
import {useEffect, useState} from "react";

export const LibraryPreview = (props: {
    lib: Libraries
}) => {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        (async() => {
            const request = await axios({
                "url": props.lib.host + "/api/lib/info",
                "method": "GET",
                "headers": {
                    "Authorization": props.lib.key
                }
            });

            setLoading(false);
        })();
    });

    if (loading) {
        return (<span>Loading...</span>);
    }

    return (
        <div>
            
        </div>     
    );
}
