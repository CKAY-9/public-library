"use client"

import { Comment, LibFile } from "@/app/api/dto";
import { BaseSyntheticEvent, useEffect, useState } from "react";
import style from "./work.module.scss";
import axios from "axios";
import { getCookie } from "@/utils/cookies";
import Link from "next/link";

const Comments = (props: {
    content: LibFile,
    id: number
}) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [newCommentContent, setNewCommentContent] = useState<string>("");

    useEffect(() => {
        (async () => {
            const request = await axios({
                "url": "/api/libs/comments/get",
                "method": "GET",
                "params": {
                    "host": props.id,
                    "file_id": props.content.id
                }
            });

            setComments(request.data);
            setLoading(false);
        })();
    }, [props.content.id, props.id]);

    const newComment = async (e: BaseSyntheticEvent) => {
        e.preventDefault();

        if (newCommentContent.length <= 0) {
            return;
        }

        const request = await axios({
            "url": "/api/libs/comments/post",
            "method": "POST",
            "headers": {
                "Authorization": getCookie("user_token")
            },
            "data": {
                "host": props.id,
                "file_id": props.content.id,
                "content": newCommentContent
            }
        });

        if (request.data.message !== undefined) {
            window.location.reload();
        }
    }
    
    if (loading) {
        return (
            <span>Loading...</span>
        );
    }

    return (
        <div className={style.comments}>
            <div className={style.newComment}>
                <label>New Comment</label>
                <textarea onChange={(e: BaseSyntheticEvent) => setNewCommentContent(e.target.value)} placeholder="Your Comment" />
                <button onClick={newComment}>Post</button>
            </div>
            {comments.length <= 0 ? <span>This entry has no comments.</span> :
                <>
                    {comments.map((comment: Comment, index: number) => {
                        return (
                            <div className={style.comment} key={index}>
                                <span className={style.author}>
                                    Posted by: {comment.author.split("@")[0]}@<Link href={comment.author.split("@")[1]}>{comment.author.split("@")[1]}</Link>
                                </span>
                                <p>{comment.content}</p>
                            </div>
                        )
                    })}
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
            <section style={{"display": "flex", "gap": "1rem"}}>
                <span>Likes: {0}</span>
                <span>Dislikes: {0}</span>
            </section>
            <section style={{ "display": "flex", "gap": "1rem" }}>
                <button onClick={() => setView(0)}>Finished</button>
                <button onClick={() => setView(1)}>Reading</button>
                <button onClick={() => setView(0)}>Going to Read</button>
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