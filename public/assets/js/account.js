"use strict"; // for error reporting

(function() { // for encapsulation and scoping

    window.addEventListener('load', init)

    function init() {

        id('username').textContent = getUserName();

        populateAccountInfo();
        id('create-form').addEventListener('submit', createGroup);
        id('join-form').addEventListener('submit', joinGroup);
        id('confirm-remove').addEventListener('click', leaveGroup)
        id('confirm-delete').addEventListener('click', deleteAccount)

        id('delete-account-btn').addEventListener('click', () => {
            id('delete-account-modal').classList.remove('hidden')
        })
        id('delete-modal-close').addEventListener('click', () => {
            id('delete-account-modal').classList.add('hidden')
        })

        id('leave-group-btn').addEventListener('click', () => {
            id('remove-from-group-modal').classList.remove('hidden')
        })
        id('remove-modal-close').addEventListener('click', () => {
            id('remove-from-group-modal').classList.add('hidden')
        })

    }

    /**
     * attempts to remove the logged in user from the inputted group
     */
    function leaveGroup() {
        let params = new FormData();
        params.append('userName', id('username').textContent)

        fetch(BASE_URL + '/groups/removeuser', { method: "POST", body: generateRequestBody(params), mode: 'cors'})
            .then((res) => {
                if (res.status == 200) {
                    return res
                } else {
                    let message = GENERIC_SERVER_ERROR
                    if (res.status == 409) {
                        message = USER_DNE_ERROR
                    } else if (res.status == 400) {
                        message = USER_NOT_IN_GROUP_ERR
                    }
                    throw new Error(message)
                }
            })
            .then((res) => {
                window.location.href = "/"
            })
            .catch((err) => {
                alert(err)
                if (err.message === USER_DNE_ERR) {
                    window.location.href = "login.html"
                } else {
                    location.reload();
                }
            })
    }

    /**
     * attempts to deletes the logged in user's account and then navigate to the home page
     */
    function deleteAccount() {
        let params = new FormData();
        params.append('userName', id('username').textContent)

        fetch(BASE_URL + '/users/delete', {method: "POST", body: generateRequestBody(params)})
            .then((res) => {
                if (res.status == 200) {
                    return res
                }
                throw new Error(GENERIC_SERVER_ERR)
            })
            .then((res) => {
                window.location.href = "/"
            })
            .catch(alert)
    }

    /**
     * populate the page with the username, first name, last
     * name, current group, and housemates of the currently logged in user
     */
    function populateAccountInfo() {

    }

    /**
     * attempts to create a new group, automatically adding the current user to that group
     * 
     * @param {object} e - object representing the submit event 
     */
    function createGroup(e) {
        e.preventDefault();

        let params = new FormData();
        params.append('userName', id('username').textContent)
        params.append('groupName', id('new-group-name').textContent)
        
        clearErrors();

        fetch(BASE_URL + '/groups/create', {method: "POST", body: generateRequestBody(params), mode: 'cors'})
            .then((res) => {
                if (res.status == 200) {
                    return res
                } else {
                    let message = GENERIC_SERVER_ERR
                    if (res.status == 409) {
                        message = USER_DNE_ERR
                    } else if (res.status == 412) {
                        message = GROUP_TAKEN_ERR
                    } else if (res.status == 428) {
                        message = ALREADY_IN_GROUP_ERR
                    }
                    throw new Error(message)
                }
            })
            .then((res) => {
                location.reload();
            })
            .catch((err) => {
                if (err.message == USER_DNE_ERR) {
                    alert(err)
                    window.location.href = 'login.html'
                } else if (err.message == GROUP_TAKEN_ERR) {
                    id('new-group-error').textContent = err
                    id('new-group-name').classList.add('error')
                } else {
                    alert(err)
                }
            })

    }

    /**
     * removes all error indicators and messages from the page
     */
    function clearErrors() {
        id('new-group-error').innerHTML = ""
        id('new-group-name').classList.remove('error')
        id('existing-group-error').innerHTML = ""
        id('existing-group-name').classList.remove('error')
    }

    /**
     * attempts to add the currently logged in user to an existing group
     * 
     * @param {object} e - object representing the submit event 
     */
     function joinGroup(e) {
        e.preventDefault();

        clearErrors();

        let params = new FormData();
        params.append('userName', id('username').textContent)
        params.append('groupName', id('existing-group-name').textContent)

        fetch(BASE_URL + '/groups/add', {method: "POST", body: params, mode: "no-cors"})
            .then((res) => {
                if (res.status == 200) {
                    return res
                } else {
                    let message = GENERIC_SERVER_ERR
                    if (res.status == 412) {
                        message = GROUP_DNE_ERR
                    } else if (res.status == 409) {
                        message = USER_DNE_ERR
                    } else if (res.status == 428) {
                        message = ALREADY_IN_GROUP_ERR
                    }
                    throw new Error(message)
                }
                    
            })
            .then((res) => {
                location.reload();
            })
            .catch(err => {
                if (err.message == GROUP_DNE_ERR) {
                    id('existing-group-error').textContent = err
                    id('existing-group-name').classList.add('error')
                } else if (err.message == USER_DNE_ERR) {
                    alert(err)
                    window.location.href = "login.html"
                } else {
                    alert(err)
                }
            })

    }



})()