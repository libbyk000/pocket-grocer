"use strict"; // for error reporting

(function() { // for encapsulation and scoping

    window.addEventListener('load', init)

    function init() {

        qs('form').addEventListener('submit', submitForm);

    }

    /**
     * send data from the form to the backend, and then navigate back to the items view
     * 
     * @param {object} e - object representing the submit event
     */
    function submitForm(e) {
        e.preventDefault();
        let data = new FormData(qs('form'));
        
        // TODO : make post request to add item api

        window.location.href = "items.html";
    }

})()