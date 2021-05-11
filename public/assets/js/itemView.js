"use strict"; // for error reporting

(function() { // for encapsulation and scoping

    window.addEventListener('load', init)

    function init() {

        populateContent();

    }

    /**
     * populate the page with the item's name, purchaser, expiration,
     * storage location, category, and number of days remaining
     */
    function populateContent() {

        let urlParams = new URLSearchParams(window.location.search);

        qs('.major').textContent = urlParams.get('item')
        
        id('purchaser').textContent = urlParams.get('purchaser')
        id('expiration').textContent = urlParams.get('expiration')
        id('location').textContent = urlParams.get('location')
        id('category').textContent = urlParams.get('category')

        let daysRemaining = urlParams.get('days')
        let icon = generateIcon(daysRemaining)
        id('expiration-container').appendChild(icon);

        if (urlParams.get('sharing') === "shared") {
            qs('.slider').click();
        }

        id('sharing').disabled = true;
    }

})()