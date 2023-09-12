"use client"

import { LibFile } from "@/app/api/dto";
import { useEffect, useState } from "react";
import style from "./work.module.scss";
import axios from "axios";
import { Library } from "@prisma/client";

const Comments = (props: {
    content: LibFile,
    id: number
}) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        (async() => {
            const request = await axios({
                "url": "/api/libs/get/comments",
                "method": "GET",
                "params": {
                    "host": props.id,
                    "file_id": props.content.id
                }
            });

            setComments(request.data);
            setLoading(false);
        })();
    })
    
    if (loading) {
        return (
            <span>Loading...</span>
        );
    }

    return (
        <div className={style.comments}>
            <div className={style.newComment}>
                <label>New Comment</label>
                <textarea placeholder="Your Comment" />
                <button>Post</button>
            </div>
            {comments.length <= 0 ? <span>This entry has no comments.</span> :
                <>
                </>
            }
        </div>
    );
} 

const WorkClient = (props: {
    content: LibFile,
    id: number
}) => {
    const [view, setView] = useState<number>(0);

    return (
        <>
            <section style={{ "display": "flex", "gap": "1rem" }}>
                <span>Likes: {0}</span>
                <span>Dislikes: {0}</span>
            </section>
            <nav style={{
                "display": "flex",
                "gap": "1rem"
            }}>
                <button onClick={() => setView(0)}>Description</button>
                <button onClick={() => setView(1)}>Comments</button>
            </nav>
            <section style={{"display": view === 0 ? "flex" : "none"}}>
                <p>{props.content.description}</p>
            </section>
            <section style={{"display": view === 1 ? "flex" : "none"}}>
                <Comments id={props.id} content={props.content}></Comments>
            </section>
        </>
    );
}

export default WorkClient;