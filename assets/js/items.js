"use strict";

(function() { // for encapsulation and scoping

    window.addEventListener('load', init)

    function init() {

        populateContent();
        id('days-btn').addEventListener('click', toggleExpirationView);

    }

    /**
     * fetch all current items in the pantry and refrigerator and display them on the page
     */
    function populateContent() {

    }

    /**
     * toggles between showing days and icons for the expiration indicator
     */
    function toggleExpirationView() {
        if (this.textContent === "Show Days") {
            this.textContent = "Show Icons";
            showDays();
        } else { // this.innerText === "SHOW ICONS"
            this.innerText = "Show Days";
            showIcons();
        }
    }

    /**
     * replaces icons with the number of remaining days until expiration for each item
     */
    function showDays() {
        let expirationIndicators = qsa('.expiration-indicator');
        expirationIndicators.forEach(indicator => {
            indicator.innerHTML = "";
            let daysRemaining = parseInt(indicator.dataset.days)
            if (daysRemaining < 0) {
                indicator.textContent = daysRemaining * -1 + " days expired";
            } else {
                indicator.textContent = indicator.dataset.days + " days remaining";
            }
            
        })
    }

    /**
     * replaces number of remaining days until expiration with icons for each item
     */
    function showIcons() {
        let expirationIndicators = qsa('.expiration-indicator');
        expirationIndicators.forEach(indicator => {
            indicator.innerHTML = "";
            let daysRemaining = parseInt(indicator.dataset.days)
            let icon = gen('i');
            icon.classList.add('fas');
            if (daysRemaining <= 0) {
                icon.classList.add('expired', 'fa-times-circle');
            } else if (daysRemaining <= 3) {
                icon.classList.add('expired-warning', 'fa-exclamation-circle');
            } else { // daysRemaining >= 4
                icon.classList.add('not-expired', 'fa-check-circle');
            }
            indicator.appendChild(icon);
        })
    }

})()