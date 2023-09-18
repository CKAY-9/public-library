// newurl code: https://stackoverflow.com/questions/10970078/modifying-a-query-string-without-reloading-the-page

const info = () => {
    document.getElementById("info").style.display = "flex";
    document.getElementById("keys").style.display = "none";
    document.getElementById("files").style.display = "none";

    let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + "?tab=info";
    window.history.pushState({path:newurl}, "", newurl);
}

const keys = () => {
    document.getElementById("info").style.display = "none";
    document.getElementById("keys").style.display = "flex";
    document.getElementById("files").style.display = "none";
    
    let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + "?tab=keys";
    window.history.pushState({path:newurl}, "", newurl);
}

const files = () => {
    document.getElementById("info").style.display = "none";
    document.getElementById("keys").style.display = "none";
    document.getElementById("files").style.display = "flex";

    let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + "?tab=files";
    window.history.pushState({path:newurl}, "", newurl);
}

const showUpload = () => {
    document.getElementById("fileUploadPopup").style.display = "flex";
}

const upload = async () => {
    const data = new FormData();
    data.append("title", document.getElementById("newUploadTitle").value);
    data.append("description", document.getElementById("newUploadDesc").value);
    data.append("author", document.getElementById("newUploadAuthor").value);
    data.append("published", document.getElementById("newUploadDate").valueAsNumber);
    data.append("work", document.getElementById("newUploadFile").files[0]);
    data.append("cover", document.getElementById("newUploadCover").files[0])

    const response = await fetch("/api/files/upload", {
        "method": "POST",
        "headers": {
            "Authorization": getCookie("token")
        },
        "body": data
    });

    if (response.status === 200) {
        window.location.reload();
    }
}

const cancelFileUpload = () => {
    document.getElementById("fileUploadPopup").style.display = "none";
}

const removeKey = async (key) => {
    const response = await fetch("/api/keys/remove", {
        "method": "DELETE",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": getCookie("token")
        },
        "body": JSON.stringify({
            "id": Number.parseInt(key)
        })
    });

    if (response.status === 200) {
        window.location.reload();
    }
}

const deleteFile = async (id) => {
    const response = await fetch("/api/files/remove", {
        "method": "DELETE",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": getCookie("token")
        },
        "body": JSON.stringify({
            "id": Number.parseInt(id)
        })
    });

    if (response.status === 200) {
        window.location.reload();
    }
}

const approveKey = async (key) => {
    const response = await fetch("/api/keys/approve", {
        "method": "PUT",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": getCookie("token")
        },
        "body": JSON.stringify({
            "id": Number.parseInt(key)
        })
    });

    if (response.status === 200) {
        window.location.reload();
    }
}

const updateInfo = async () => {
    const response = await fetch("/api/library/update", {
        "method": "PUT",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": getCookie("token")
        },
        "body": JSON.stringify({
            "name": document.getElementById("libNameInput").value,
            "description": document.getElementById("libDescInput").value
        })
    });

    if (response.status === 200) {
        window.location.reload();
    }
}

window.onload = () => {
    document.getElementById("fileUploadPopup").style.display = "none";

    const params = new URLSearchParams(window.location.search);
    switch (params.get("tab")) {
        case "keys":
            keys();
            break;
        case "files":
            files();
            break;
        default:
            info();
            break;
    }
}