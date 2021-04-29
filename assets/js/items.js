"use strict";

(function() { // for encapsulation and scoping

    window.addEventListener('load', init)

    function init() {

        populateContent();

        let items = qsa('.item')
        items.forEach(item => {
            item.addEventListener('click', showItemView)
        })
        id('days-btn').addEventListener('click', toggleExpirationView);

    }

    /**
     * fetch all current items in the pantry and refrigerator and display them on the page
     */
    function populateContent() {

    }

    /**
     * navigate to the single item view
     */
    function showItemView() {
        let purchaser = this.dataset.purchaser
        let expiration = this.dataset.expiration
        let location = this.dataset.location
        let category = this.dataset.category
        let sharing = this.dataset.sharing

        let days = this.lastElementChild.dataset.days

        let url = "itemView.html?item=" + this.firstElementChild.textContent
        url += "&purchaser=" + purchaser
        url += "&expiration=" + expiration
        url += "&location=" + location
        url += "&category=" + category
        url += "&sharing=" + sharing
        url += "&days=" + days

        window.location.href = url

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
            let icon = generateIcon(daysRemaining)
            indicator.appendChild(icon);
        })
    }

})()