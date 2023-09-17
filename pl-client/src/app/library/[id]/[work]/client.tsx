"use client"

import { Comment, LibFile } from "@/app/api/dto";
import { BaseSyntheticEvent, useEffect, useState } from "react";
import style from "./work.module.scss";
import axios from "axios";
import { getCookie } from "@/utils/cookies";
import Link from "next/link";
import Image from "next/image";
import { User } from "@prisma/client";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export const DocView = (props: {
    url: string
}) => {
    const [numPages, setNumPages] = useState<number>();
    const [pageNumber, setPageNumber] = useState<number>(1);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
        setNumPages(numPages);
    }

    return (
        <>
            <Document file={{
                "url": props.url
            }} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} className={style.page}></Page>
            </Document>
        </>
    );
}

const Comments = (props: {
    content: LibFile,
    id: number,
    user: User | null
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
            {props.user !== null &&
                <div className={style.newComment}>
                    <label>New Comment</label>
                    <textarea onChange={(e: BaseSyntheticEvent) => setNewCommentContent(e.target.value)} placeholder="Your Comment" />
                    <button onClick={newComment}>Post</button>
                </div>
            }
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
    id: number,
    user: User | null
}) => {
    const [view, setView] = useState<number>(0);

    const setFinished = async (e: BaseSyntheticEvent) => {
        e.preventDefault();
        const request = await axios({
            "url": "/api/user/reading/finished",
            "method": "POST",
            "headers": {
                "Authorization": getCookie("user_token") || ""
            },
            "data": {
                "work": Number.parseInt(props.content.id.toString()),
                "server": Number.parseInt(props.id.toString())
            }
        });
    }

    const setGoingToRead = async (e: BaseSyntheticEvent) => {
        e.preventDefault();
        const request = await axios({
            "url": "/api/user/reading/gtr",
            "method": "POST",
            "headers": {
                "Authorization": getCookie("user_token") || ""
            },
            "data": {
                "work": Number.parseInt(props.content.id.toString()),
                "server": Number.parseInt(props.id.toString())
            }
        });
    }

    const setReading = async (e: BaseSyntheticEvent) => {
        e.preventDefault();
        const request = await axios({
            "url": "/api/user/reading/reading",
            "method": "POST",
            "headers": {
                "Authorization": getCookie("user_token") || ""
            },
            "data": {
                "work": Number.parseInt(props.content.id.toString()),
                "server": Number.parseInt(props.id.toString())
            }
        });
    }

    const like = async (e: BaseSyntheticEvent) => {
        e.preventDefault();

        if (props.user === null) return;

        const request = await axios({
            "url": "/api/libs/file/like",
            "method": "POST",
            "data": {
                "workID": props.id
            },
            "headers": {
                "Authorization": getCookie("user_token")
            }
        });
    }

    const dislike = async (e: BaseSyntheticEvent) => {
        e.preventDefault();

        if (props.user === null) return;

        const request = await axios({
            "url": "/api/libs/file/dislike",
            "method": "POST",
            "data": {
                "lib": props.id,
                "work": props.content.id
            },
            "headers": {
                "Authorization": getCookie("user_token")
            }
        });
    }

    return (
        <>
            <section style={{"display": "flex", "gap": "1rem"}}>
                <div style={{"display": "flex", "gap": "0.5rem", "alignItems": "center"}}>
                    <span>{props.content.likes.length}</span>    
                    <button onClick={like} style={{"backgroundColor": "transparent", "padding": "0.5rem", "display": "grid", "placeContent": "center"}}>
                        <Image src="/thumbs_up.svg" alt="Thumbs Up" sizes="100%" width={0} height={0} style={{
                            "width": "1rem",
                            "height": "1rem",
                            "filter": "invert(1)",
                            "opacity": "0.5"
                        }} />
                    </button>
                </div>
                <div style={{"display": "flex", "gap": "0.5rem", "alignItems": "center"}}>
                    <span>{props.content.dislikes.length}</span>    
                    <button onClick={dislike} style={{"backgroundColor": "transparent", "padding": "0.5rem", "display": "grid", "placeContent": "center"}}>
                        <Image src="/thumbs_down.svg" alt="Thumbs Down" sizes="100%" width={0} height={0} style={{
                            "width": "1rem",
                            "height": "1rem",
                            "filter": "invert(1)",
                            "opacity": "0.5"
                        }} />
                    </button>
                </div>
            </section>
            {props.user !== null &&
                <section style={{ "display": "flex", "gap": "1rem" }}>
                    <button onClick={setFinished}>Finished</button>
                    <button onClick={setReading}>Reading</button>
                    <button onClick={setGoingToRead}>Going to Read</button>
                </section>
            }
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
                <Comments user={props.user} id={props.id} content={props.content}></Comments>
            </section>
        </>
    );
}

export default WorkClient;