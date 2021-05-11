// base server URL
const BASE_URL = "http://localhost:4567"

// error messages
const USER_DNE_ERR = "Your username was not found. Please login again."
const GENERIC_SERVER_ERR = "Something went wrong on our end. Please try again later."
const ITEM_DNE_ERR = "This item no longer exists."
const GROUP_DNE_ERR = "The submitted group name was not found."
const USER_NOT_IN_GROUP_ERR = "You are currently not in a group."
const GROUP_TAKEN_ERR = "This group name is already in use."
const USER_TAKEN_ERR = "This username is already in use."
const ALREADY_IN_GROUP_ERR = "You are already in a group. Please leave before trying to join a new one."
const INCORRECT_PASSWORD_ERR = "Your username and password do not match."

// helper functions

/**
 * returns HTML element with the given ID
 * 
 * @param {string} id - id of html element
 * @returns {object} - DOM object
 */
function id(id) {
    return document.getElementById(id)
}

/**
 * returns first HTML element that matches the given CSS selector
 * 
 * @param {string} selector - css selector
 * @returns {object} - DOM object
 */
function qs(selector) {
    return document.querySelector(selector)
}

/**
 * returns an array of HTML elements that match the given CSS selector
 * 
 * @param {string} selector - css selector
 * @returns 
 */
function qsa(selector) {
    return document.querySelectorAll(selector)
}

/**
 * returns a reference to a new HTML element of the given tag
 * 
 * @param {string} tag - valid HTML tag
 * @returns {object} - HTML element
 */
function gen(tag) {
    return document.createElement(tag)
}

/**
 * returns the cookie with the name userName
 * returns empty string if cookie is not set
 * 
 * @returns {string} - username cookie
 */
function getUserName() {
    let cookies = document.cookie.split(";");
    let userName = "";
    for (let i = 0; i < cookies.length; i++) {
        let key = cookies[i].split("=");
        if (key[0].trim() == "userName") {
            userName = key[1];
        }
    }
    return userName;
}

/**
 * clears all cookies, and navigates to the home page
 */
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

/**
 * returns an appropriate icon based on the number of days until
 * expiration of an item.
 * <=0 days - red warning icon
 * <=3 days - yellow warning icon
 * >=4 days - green check mark
 * 
 * @param {number} daysRemaining - integer number of days
 * @returns {object} - icon HTML element
 */
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

/**
 * converts FormData object into JSON object
 * takes the entries and values from the FormData object and sets them
 * as the top-level fields and values respectively in the JSON object.
 * 
 * @param {object} formData - object representing HTML form element
 * @returns {JSON} - key value pairs
 */
function generateRequestBody(formData) {
    let object = {};
    formData.forEach(function(value, key) {
        object[key] = value;
    });
    let json = JSON.stringify(object);
    return json;
}