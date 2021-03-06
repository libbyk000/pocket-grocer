"use strict";

(function() { // for encapsulation and scoping

    window.addEventListener('load', init)

    function init() {
        qs('form').addEventListener('submit', login)
    }

    /**
     * attempts to log the user in and then navigate to the items page
     * 
     * @param {object} e - object representing the submit event
     */
    function login(e) {
        e.preventDefault();

        clearErrors();

        let url = BASE_URL + '/users/login'
        fetch(url, {method: "POST", body: generateRequestBody(new FormData(qs('form'))) })
            .then(checkStatus)
            .then(res => res.text())
            .then(() => {
                document.cookie = "userName=" + qs('input[name=userName]').value;
                window.location.href = "items.html"
            })
            .catch(err => {
                // TODO: remove this special comment
                // This exists in the case that a new user attempts
                // to use our service without hosting the backend.
                alert("Our backend server is down. You must run it locally in order to use our app.");
            })
    }

    /**
     * clears all error indicators and messages from the page
     */
    function clearErrors() {
        id('username-error').innerHTML = "";
        id('password-error').innerHTML = "";
        qs('input[name=userName]').classList.remove('error')
        qs('input[name=password]').classList.remove('error')
    }

    /**
     * checks the status code of the response from the server, and throws
     * an appropriate error in the case it recognizes a known error code, or
     * an otherwise generic error
     * 
     * @param {object} res - object representing the response from the server 
     * @returns {object} - unmodified parameter
     */
    async function checkStatus(res) {
        if (res.status === 200) {
            return res
        } else {
            if (res.status === 409) {
                qs('input[name=userName]').classList.add('error')
                id('username-error').textContent = USER_DNE_ERR
            } else if (res.status === 400) {
                qs('input[name=password]').classList.add('error')
                id('password-error').textContent = INCORRECT_PASSWORD_ERR
            }
            throw new Error(GENERIC_SERVER_ERR);
        }
    }

})();