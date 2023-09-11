"use client";

import {getCookie} from "@/utils/cookies";
import {Config, Libraries, User} from "@prisma/client";
import axios from "axios";
import {BaseSyntheticEvent, useEffect, useState} from "react";

const AdminConfig = (props: {
    instanceInfo: Config
}) => {
    const [uName, setUName] = useState<string>(props.instanceInfo.instance_name);
    const [uDesc, setUDesc] = useState<string>(props.instanceInfo.instance_description);
    const [uRepo, setURepo] = useState<string>(props.instanceInfo.instance_repo);
    const [libs, setLibs] = useState<Libraries[]>([]);
    const [libLoading, setLibLoading] = useState<boolean>(true);

    useEffect(() => {
        (async() => {
            const libsFetch = await axios({
                "url": "/api/libs/all",
                "method": "GET"
            });

            setLibs(libsFetch.data);
            setLibLoading(false);
         })();
    }, []);

    const update = async (e: BaseSyntheticEvent) => {
        e.preventDefault();
        const request = await axios({
            "url": "/api/instance/update",
            "method": "PUT",
            "data": {
                "name": uName,
                "desc": uDesc,
                "repo": uRepo
            },
            "headers": {
                "Authorization": getCookie("user_token")
            }
        });
    }

    return (
        <>
            <h2>Admin Settings</h2>
            <label>Instance Name</label>
            <input onChange={(e: BaseSyntheticEvent) => setUName(e.target.value)} type="text" placeholder="Instance Name" defaultValue={uName} />
            <label>Instance Repository</label>
            <input onChange={(e: BaseSyntheticEvent) => setURepo(e.target.value)} type="text" placeholder="Instance Repository" defaultValue={uRepo} />
            <label>Instance Description</label>
            <textarea onChange={(e: BaseSyntheticEvent) => setUDesc(e.target.value)} placeholder="Instance Description" defaultValue={uDesc} />
            {libLoading ? <label>Loading Linked Libraries</label> : 
                <>
                    <label>Linked Libraries</label>
                    {libs.map((lib: Libraries, index: number) => {
                        return (
                            <div key={index}>
                                <label>Library #{lib.id}</label>
                                <input type="text" placeholder="Instance Key" defaultValue={lib.key} />
                                <input type="text" placeholder="Library URL" defaultValue={lib.host} />
                            </div>
                        );
                    })}
                    <button onClick={() => {
                        setLibs(old => [...old, {
                            "host": "https://lib.tld",
                            "key": "KEY",
                            "id": libs.length + 1
                        }]);
                    }}>New</button>
                </>
            }
            <button onClick={update}>Update</button>
        </>
    );
}

const AccountClient = (props: {
    instanceInfo: Config,
    userInfo: User
}) => {
    return (
        <>
            <h1>Hello, {props.userInfo.username}</h1>
            <label>Username</label>
            <input type="text" placeholder="Username" defaultValue={props.userInfo.username}></input>
            
            {props.userInfo.admin && <AdminConfig instanceInfo={props.instanceInfo} />}
        </>
    );
}

export default AccountClient;
