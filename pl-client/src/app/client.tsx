"use client";

import axios from "axios";
import {BaseSyntheticEvent, useEffect, useState} from "react";
import { LibInfo, Profile } from "./api/dto";
import style from "./index.module.scss";
import Link from "next/link";
import { Library, User } from "@prisma/client";

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
    info: LibInfo | null
}) => {
    if (props.info === null) {
        return (<></>)
    }

    return (
        <Link href={`/library/${props.info.id}`} className={style.library}>
            <h3>{props.info.name}</h3>
            <p>{props.info.description}</p>
        </Link>     
    );
}

export const LibrariesClient = (props: {
    libraries: LibInfo[]
}) => {
    const [search, setSearch] = useState<string>("");

    return (
        <>
            {props.libraries.length <= 0 ? <h2>No libraries found</h2> : <>
                <h2>Libraries</h2>
                <input type="text" placeholder="Search library by name" onChange={(e: BaseSyntheticEvent) => setSearch(e.target.value.toLowerCase())} />
            </>}    
                <div className={style.libraries}>
                    {props.libraries.filter((l) => l.name.toLowerCase().includes(search)).map((lib: LibInfo, index: number) => {
                        return (
                            <LibraryPreview info={lib}  key={index} />
                        );
                    })}
            </div>
        </>
    );
}

export const UsersClient = (props: {
    users: Profile[]
}) => {
    const [search, setSearch] = useState<string>("");

    return (
        <>
            {props.users.length <= 0 ? <h2>No users found</h2> : <>
                <h2>Users</h2>
                <input type="text" placeholder="Search user by name" onChange={(e: BaseSyntheticEvent) => setSearch(e.target.value.toLowerCase())} />
            </>}
            <div className={style.users}>
                {props.users.filter((u) => u.username.toLowerCase().includes(search)).map((user: Profile, index: number) => {
                    return (
                        <UserPreview key={index} user={user} />
                    );
            })}
            </div>
        </>
    );
}