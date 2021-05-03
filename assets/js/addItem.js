"use strict"; // for error reporting

(function() { // for encapsulation and scoping

    window.addEventListener('load', init)

    function init() {

        qs('form').addEventListener('submit', submitForm);
        let recentPurchaseRadios = qsa('input[name=recent-purchase]')
        recentPurchaseRadios.forEach(radio => {
            radio.addEventListener('change', updateItemDropdown)
        })
        id('no').click();
    }

    function updateItemDropdown() {
        id('item-name').innerHTML = "";
        if (this.id === "no") {
            INGREDIENTS.forEach(ingredient => {
                let entry = document.createElement('option')
                entry.textContent = ingredient.name
                id('item-name').appendChild(entry);
            })
        } else { // this.id === "yes"
            
            // TODO: pull recently purchased items from backend

        }
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