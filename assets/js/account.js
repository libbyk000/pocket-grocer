"use strict"; // for error reporting

(function() { // for encapsulation and scoping

    window.addEventListener('load', init)

    function init() {

        populateAccountInfo();
        let removeHousmateButtons = qsa('.remove-housemate')
        removeHousmateButtons.forEach(button => {
            button.addEventListener('click', removeHousmate)
        })
        qs('form').addEventListener('submit', addHousemate);

    }

    /**
     * fetch account info from backend and populate the page
     */
    function populateAccountInfo() {

    }

    function removeHousmate() {
        let housemateUsername = this.previousElementSibling.textContent;

        // TODO: make post request to backend

        this.parentElement.remove();
    }

    /**
     * submit new housemate to backend and then refresh the page
     * 
     * @param {object} e - object representing the submit event 
     */
    function addHousemate(e) {
        e.preventDefault();

        let data = new FormData(qs('form'));

        // TODO: make post request to backend

        location.reload();
    }


})()