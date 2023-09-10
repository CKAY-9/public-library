import {Config, User} from "@prisma/client";

const AccountClient = (props: {
    instanceInfo: Config,
    userInfo: User
}) => {
    return (
        <>
            <h1>Hello, {props.userInfo.username}</h1>
            <label>Username</label>
            <input type="text" placeholder="Username" defaultValue={props.userInfo.username}></input>
            
            {props.userInfo.admin && 
                <>
                    <h2>Admin Settings</h2>
                    <label>Instance Name</label>
                    <input type="text" placeholder="Instance Name" defaultValue={props.instanceInfo.instance_name} />
                    <label>Instance Description</label>
                    <textarea />
                    <label>Linked Libraries</label>
                </>
            }
        </>
    );
}

export default AccountClient;
