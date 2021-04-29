"use strict";

(function() { // for encapsulation and scoping

    window.addEventListener('load', init)

    function init() {

        populateContent();

        let items = qsa('.item')
        items.forEach(item => {
            item.addEventListener('click', showItemView)
        })

        let sortings = qsa('#sort-by-list li');
        sortings.forEach(el => {
            el.addEventListener('click', itemSort)
        })

        id('days-btn').addEventListener('click', toggleExpirationView);
        id('sort-filter-btn').addEventListener('click', function() {
            qs('.modal').classList.remove('hidden')
        });
        id('modal-close').addEventListener('click', function() {
            qs('.modal').classList.add('hidden')
        })
    }

    /**
     * fetch all current items in the pantry and refrigerator and display them on the page
     */
    function populateContent() {

    }

    /**
     * clears all check marks from the modal
     */
    function clearAllSortings() {
        let sortings = qsa('#sort-by-list li');
        sortings.forEach(el => {
            if (el.firstElementChild) {
                el.removeChild(el.firstElementChild)
            }
        })
    }

    /**
     * sort the items in each category based on the selected sorting
     */
    function itemSort() {
        if (this.firstElementChild) { // already checked
            return;
        }
        clearAllSortings();
        let comparator;
        if (this.textContent == "Alphabetical") {
            comparator = (el1, el2) => {
                return el1.firstElementChild.textContent.localeCompare(el2.firstElementChild.textContent)
            }
        } else if (this.textContent === "Expiration date (soonest first)") {
            comparator = (el1, el2) => {
                return el1.lastElementChild.dataset.days - el2.lastElementChild.dataset.days
            }
        } else { // this.textContent === "Expiration date(latest first)"
            comparator = (el1, el2) => {
                return el2.lastElementChild.dataset.days - el1.lastElementChild.dataset.days
            }
        }

        let sortedPantry = [];
        let sortedFridge = [];
        let items = qsa('.item-list li')
        items.forEach(item => {
            if (item.dataset.location === "Pantry") {
                sortedPantry.push(item)
            } else { // item.dataset.location == "Refrigerator"
                sortedFridge.push(item)
            }
        })

        sortedPantry.sort(comparator)
        id('pantry-list').innerHTML = "";
        sortedPantry.forEach(item => {
            id('pantry-list').appendChild(item)
        })

        sortedFridge.sort(comparator)
        sortedFridge.forEach(item => {
            id('fridge-list').appendChild(item)
        })

        this.prepend(createCheckMark());
    }

    /**
     * creates and returns a check mark icon
     * 
     * @returns DOM Object - icon html element
     */
    function createCheckMark() {
        let check = gen('i');
        check.classList.add('fas', 'fa-check', 'align-icon-left')
        return check;
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