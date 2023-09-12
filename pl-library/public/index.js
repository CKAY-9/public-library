const register = async () => {
    const response = await fetch("/api/users/new", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
        },
        "body": JSON.stringify({
            "username": document.getElementById("usernameInput").value,
            "password": document.getElementById("passwordInput").value
        })
    });

    const result = await response.json();
    if (result.token !== undefined) {
        setCookie("token", result.token, 365);
        window.location.reload();
    }
}

const login = async () => {
    const response = await fetch(`/api/users/new?username=${document.getElementById("usernameInput").value}&password=${document.getElementById("passwordInput").value}`);
    
    const result = await response.json();
    if (result.token !== undefined) {
        setCookie("token", result.token, 365);
        window.location.reload();
    }
}

const cancelCreation = () => {
    document.getElementById("popup").remove();
}

const createNewKey = async () => {
    const response = await fetch("/api/keys/generate", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": getCookie("token")
        },
        "body": JSON.stringify({
            "host": document.getElementById("newInstanceHost").value
        })
    });
    const data = await response.json();
    console.log(data);
    if (response.status === 200) {
        window.location.reload();
    }
}
 
const appendPopup = () => {
    document.body.innerHTML += `
        <div class="popup" id="popup">
            <div class="content">
                <h2>Register Instance Key</h2>
                <label>Client Host</label>
                <input type="text" id="newInstanceHost" placeholder="ex: https://myclient.tld" />
                <span>Once you click generate, you will need to wait for approval by library admins</span>
                <section>
                    <button onclick="createNewKey()">Generate</button>
                    <button onclick="cancelCreation()">Cancel</button>
                </section>
            </div>
        </div>
    `;
}