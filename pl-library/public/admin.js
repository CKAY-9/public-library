const info = () => {
    document.getElementById("info").style.display = "flex";
    document.getElementById("keys").style.display = "none";
    document.getElementById("files").style.display = "none";
}

const keys = () => {
    document.getElementById("info").style.display = "none";
    document.getElementById("keys").style.display = "flex";
    document.getElementById("files").style.display = "none";
}

const files = () => {
    document.getElementById("info").style.display = "none";
    document.getElementById("keys").style.display = "none";
    document.getElementById("files").style.display = "flex";
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

window.onload = () => {
    info();
}