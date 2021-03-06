"use strict"; // for error reporting

(function() { // for encapsulation and scoping

    window.addEventListener('load', init)

    function init() {

        id('username').textContent = getUserName();

        fetchAccountInfo();
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

        fetch(BASE_URL + '/groups/removeuser', { method: "POST", body: generateRequestBody(params) })
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
                window.location.href = "account.html"
            })
            .catch((err) => {
                alert(err)
                if (err.message === USER_DNE_ERR) {
                    window.location.href = "login.html"
                } else {
                    window.location.href = "account.html"
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
    function fetchAccountInfo() {
        let params = new FormData();
        params.append('userName', getUserName())

        fetch(BASE_URL + '/users/groupdata', { method: "POST", body: generateRequestBody(params) })
            .then(res => {
                if (res.status == 200) {
                    return res
                } else if (res.status == 409) {
                    throw new Error(USER_DNE_ERR)
                } else {
                    throw new Error(GENERIC_SERVER_ERR)
                }
            })
            .then(res => res.json())
            .then(populateAccountInfo)
            .catch(err => {
                if (err.message == USER_DNE_ERR) {
                    alert(err)
                    window.location.href = "login.html"
                } else {
                    console.error(err)
                }
            })
    }

    /**
     * shows/hides the group management based on whether the user is in a group
     * populates other account and group info, like username and housemates
     * 
     * @param {object} res - JSON object holding some account info about logged in user
     */
    function populateAccountInfo(res) {
        
        id('current-group-name').textContent = res.GroupName
        id('leave-group-btn').classList.remove('hidden')

        res.groupMembers.forEach(member => {
            if (member != getUserName()) {
                let li = document.createElement('li')
                li.textContent = member
                id('current-housemates-list').appendChild(li)
            }
        })

        id('group-container').classList.add('hidden')
    }

    /**
     * attempts to create a new group, automatically adding the current user to that group
     * 
     * @param {object} e - object representing the submit event 
     */
    function createGroup(e) {
        e.preventDefault();

        let params = new FormData();
        params.append('userName', getUserName())
        params.append('groupName', id('new-group-name').value)
        
        clearErrors();

        fetch(BASE_URL + '/groups/create', {method: "POST", body: generateRequestBody(params) })
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
        params.append('groupName', id('existing-group-name').value)

        fetch(BASE_URL + '/groups/add', {method: "POST", body: generateRequestBody(params) })
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