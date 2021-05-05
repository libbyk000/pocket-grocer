"use strict"; // for error reporting

(function() { // for encapsulation and scoping

    window.addEventListener('load', init)

    function init() {

        populateAccountInfo();
        id('create-form').addEventListener('submit', createGroup);
        id('join-form').addEventListener('submit', joinGroup);

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

        let data = new FormData(id('create-form'));

        // TODO: make post request to backend

        location.reload();
    }

    /**
     * join an existing group
     * 
     * @param {object} e - object representing the submit event 
     */
     function joinGroup(e) {
        e.preventDefault();

        let data = new FormData(id('join-form'));

        // TODO: make post request to backend

        location.reload();
    }



})()