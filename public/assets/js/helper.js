function id(id) {
    return document.getElementById(id)
}

function qs(selector) {
    return document.querySelector(selector)
}

function qsa(selector) {
    return document.querySelectorAll(selector)
}

function gen(tag) {
    return document.createElement(tag)
}

function qs(selector) {
    return document.querySelector(selector)
}

function getSession() {
    let cookies = document.cookie.split(";");
    let session = "";
    for (let i = 0; i < cookies.length; i++) {
        let key = cookies[i].split("=");
        if (key[0].trim() == "session") {
            session = key[1];
        }
    }
    return session;
}

function signOut() {
    let cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        let eqPos = cookie.indexOf("=");
        let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    window.location = "/";
}

function generateIcon(daysRemaining) {
    let icon = gen('i');
    icon.classList.add('fas');
    if (daysRemaining <= 0) {
        icon.classList.add('expired', 'fa-times-circle');
    } else if (daysRemaining <= 3) {
        icon.classList.add('expired-warning', 'fa-exclamation-circle');
    } else { // daysRemaining >= 4
        icon.classList.add('not-expired', 'fa-check-circle');
    }
    return icon;
}

function generateRequestBody(formData) {
    let object = {};
    formData.forEach(function(value, key) {
        object[key] = value;
    });
    let json = JSON.stringify(object);
    return json;
}