import Header from "@/components/header/header";
import {getInstanceInfo} from "@/data/instance";
import { getLibraries } from "@/data/libraries";
import { getSelfWithToken, getToken } from "@/data/user";
import { Library } from "@prisma/client";
import {Metadata} from "next";
import Link from "next/link";

export const generateMetadata = async (): Promise<Metadata> => {
    const info = await getInstanceInfo();
    return {
        "title": "About - " + info.instance_name,
        "description": info.instance_description
    }
}

const About = async () => {
    const info = await getInstanceInfo();
    const user = await getSelfWithToken(getToken() || "");
    const linkedLibraries = await getLibraries();

    return (
        <>
            <Header user={user} instanceInfo={info}></Header>
            <main className="container">
                <h1>About This Instance</h1>
                <span>Name: {info.instance_name}</span>
                <span>Repository: <Link href={info.instance_repo}>{info.instance_repo}</Link></span>
                <span>Linked Libraries:</span>
                {linkedLibraries.length >= 1 &&
                    <>
                        {linkedLibraries.map((lib: Library, index: number) => {
                            return (
                                <li><Link href={lib.host}>{lib.host}</Link></li>
                            )
                        })}
                    </>
                }
                <p>{info.instance_description}</p>
                <h1>About PubLib</h1>
                <p>
                    Public Library (or PubLib) is a <Link href="https://en.wikipedia.org/wiki/Decentralized_web">decentralized</Link> library system that 
                    uses <Link href="https://nextjs.org/">NextJS</Link> as a default client, and <Link href="https://expressjs.com/">ExpressJS</Link> as the library backend.
                </p>
                <Link href="https://github.com/CKAY-9/public-library">Official Repository</Link>
 
            </main>
        </>
    );
}

export default About;
