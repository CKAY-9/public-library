import { LibFile } from "@/app/api/dto";
import style from "./preview.module.scss";
import Image from "next/image";
import { Library } from "@prisma/client";
import Link from "next/link";

const WorkPreview = (props: {
    file: LibFile,
    host: Library
}) => {
    if (props.host === null || props.file === null) {
        return (<></>);
    }

    return (
        <Link href={`/library/${props.host.id}/${props.file.id}`} className={style.work}>
            {props.file.cover !== "" &&
                <Image src={`${props.host.host}/${props.file.cover}`} alt={"Cover"} sizes="100%" width={0} height={0} />
            }
            <section style={{"display": "flex", "gap": "1rem"}}>
                <div style={{"display": "flex", "gap": "0.5rem", "alignItems": "center"}}>
                    <span>{props.file.likes.length}</span>    
                    <Image src="/thumbs_up.svg" alt="Thumbs Up" sizes="100%" width={0} height={0} style={{
                        "width": "1rem",
                        "height": "1rem",
                        "filter": "invert(1)",
                        "opacity": "0.5"
                    }} />
                </div>
                <div style={{"display": "flex", "gap": "0.5rem", "alignItems": "center"}}>
                    <span>{props.file.dislikes.length}</span>    
                    <Image src="/thumbs_down.svg" alt="Thumbs Down" sizes="100%" width={0} height={0} style={{
                        "width": "1rem",
                        "height": "1rem",
                        "filter": "invert(1)",
                        "opacity": "0.5"
                    }} />
                </div>
            </section>
            <h3>{props.file.title}</h3>
            <span>Author: {props.file.author}</span>
            <span>Description: {props.file.description.slice(0, 75 > props.file.description.length ? props.file.description.length : 75)}...</span>
        </Link>
    );
}

export default WorkPreview;