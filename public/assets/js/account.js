"use strict"; // for error reporting

(function() { // for encapsulation and scoping

    const BASE_URL = "http://localhost:4567"

    window.addEventListener('load', init)

    function init() {

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

    function leaveGroup() {
        let params = new FormData();
        params.append('userName', id('username').textContent)

        fetch(BASE_URL + '/groups/removeuser', { method: "POST", body: generateRequestBody(params), mode: 'cors'})
            .then((res) => {
                if (res.status == 200) {
                    return res
                } else if (res.status == 409) {
                    throw new Error('Your username was not found. Please login again.')
                } else if (res.status == 400) {
                    throw new Error('You are currently not in any groups.')
                }
            })
            .then((res) => {
                window.location.href = "/"
            })
            .catch((err) => {
                alert(err)
                console.log(err.message)
                if (err.message == 'Your username was not found. Please login again.') {
                    window.location.href = "login.html"
                } else {
                    window.location.href = "account.html"
                }
            })
    }

    /**
     * deletes the user account and navigates back to the home page
     */
    function deleteAccount() {
        let params = new FormData();
        params.append('userName', id('username').textContent)

        fetch(BASE_URL + '/users/delete', {method: "POST", body: generateRequestBody(params)})
            .then((res) => {
                if (res.status == 200) {
                    return res
                } else {
                    throw new Error('There was an error deleting your account. Please try again later.')
                }
            })
            .then((res) => {
                window.location.href = "/"
            })
            .catch((err) => {
                alert(err)
            })
    }

    /**
     * fetch account info from backend and populate the page
     */
    function populateAccountInfo() {

    }

    /**
     * create a new group, automatically adding the current user to that group
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
                } else if (res.status == 409) {
                    throw new Error('Your username was not found. Please login again.')
                } else if (res.status == 400) {
                    throw new Error('*Group name is already in use.')
                }
            })
            .then((res) => {
                location.reload();
            })
            .catch((err) => {
                if (err.message == 'Your username was not found. Please login again.') {
                    alert(err)
                    window.location.href = 'login.html'
                } else if (err.message == '*Group name is already in use.') {
                    id('new-group-error').textContent = err
                    id('new-group-name').classList.add('error')
                } else {
                    alert("Something went wrong on our end. Please try again.")
                    location.reload();
                }
            })

    }

    function clearErrors() {
        id('new-group-error').innerHTML = ""
        id('new-group-name').classList.remove('error')
        id('existing-group-error').innerHTML = ""
        id('existing-group-name').classList.remove('error')
    }

    /**
     * join an existing group
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
                } else if (res.status == 409) {
                    throw new Error('*Group name does not exist')
                } else if (res.status == 400) {
                    throw new Error('Your username was not found. Please login again.')
                }
            })
            .then((res) => {
                location.reload();
            })
            .catch(err => {
                if (err == '*Group name does not exist') {
                    id('existing-group-error').textContent = err
                    id('existing-group-name').classList.add('error')
                } else if (err == 'Your username was not found. Please login again.') {
                    alert(err)
                    window.location.href = "login.html"
                }
            })

    }



})()