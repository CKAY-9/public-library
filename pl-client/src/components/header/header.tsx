import {Config} from "@prisma/client";
import Link from "next/link";

const Header = (props: {
    instanceInfo: Config
}) => {
    return (
        <header>
            <ul>
                <li><Link href="/">{props.instanceInfo.instance_name}</Link></li>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/account">Account</Link></li>
            </ul>
        </header>     
    );
} 

export default Header;
