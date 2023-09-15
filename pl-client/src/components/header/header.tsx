import {Config, User} from "@prisma/client";
import Link from "next/link";

const Header = (props: {
    instanceInfo: Config,
    user: User | null
}) => {
    return (
        <header>
            <ul>
                <li><Link href="/">{props.instanceInfo.instance_name}</Link></li>
                <li><Link href="/about">About</Link></li>
            </ul>
            {props.user !== null ?
                <ul>
                    <li><Link href="/account">Settings</Link></li>
                    <li><Link href={`/profile/${props.user.id}`}>Profile</Link></li>
                </ul> :
                <ul>
                    <li><Link href="/account/auth">Login/Register</Link></li>
                </ul>
            }

        </header>     
    );
} 

export default Header;
