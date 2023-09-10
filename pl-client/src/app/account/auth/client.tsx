"use client";
import {SHA256} from "crypto-js";
import {BaseSyntheticEvent, use, useState} from "react";
import axios from "axios";
import {redirect} from "next/navigation";
import {setCookie} from "@/utils/cookies";

const AuthorizationClient = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const register = async (e: BaseSyntheticEvent) => {
        e.preventDefault();
        const request = await axios({
            "url": "/api/auth/register",
            "method": "POST",
            "data": {
                "username": username,
                "password": password
            }
        });

        if (request.data.user_token !== undefined) {
            setCookie("user_token", request.data.user_token, 365);
            window.location.href = "/account";
        }
    }

    const login = async (e: BaseSyntheticEvent) => {
        e.preventDefault();
        const request = await axios({
            "url": "/api/auth/login",
            "method": "GET",
            "params": {
                "username": username,
                "password": password
            },
        });

        if (request.data.user_token !== undefined) {
            setCookie("user_token", request.data.user_token, 365);
            window.location.href = "/account";
        }
    }

    return (
        <>
            <h1>Authorization</h1>
            <form style={{
                "display": "flex",
                "flexDirection": "column",
                "maxWidth": "fit-content",
                "gap": "1rem"
            }}>
                <label>Username (must be unique)</label>
                <input onChange={(e: BaseSyntheticEvent) => setUsername(e.target.value)} type="text" name="username" placeholder="Username" />
                <label>Password (must be at least 8 characters)</label>
                <input onChange={(e: BaseSyntheticEvent) => setPassword(SHA256(e.target.value).toString())} type="password" name="password" minLength={8} placeholder="Password" />
                <section style={{
                    "display": "flex",
                    "gap": "1rem"
                }}>
                    <button onClick={login}>Login</button>
                    <button onClick={register}>Register</button>
                </section>
            </form>
        </>
    );
}

export default AuthorizationClient;
