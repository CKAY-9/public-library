import { LibFile } from "@/app/api/dto";
import style from "./preview.module.scss";
import Image from "next/image";
import { Library } from "@prisma/client";
import Link from "next/link";

const WorkPreview = (props: {
    file: LibFile,
    host: Library
}) => {
    return (
        <Link href={`/library/${props.host.id}/${props.file.id}`} className={style.work}>
            {props.file.cover !== "" &&
                <Image src={`${props.host.host}/${props.file.cover}`} alt={"Cover"} sizes="100%" width={0} height={0} />
            }
            <section style={{"display": "flex", "justifyContent": "space-between"}}>
                <span>Likes: {0}</span>
                <span>Dislikes: {0}</span>
            </section>
            <h3>{props.file.title}</h3>
            <span>Author: {props.file.author}</span>
            <p>{props.file.description.slice(0, 75 > props.file.description.length ? props.file.description.length : 75)}...</p>
        </Link>
    )
}

export default WorkPreview;