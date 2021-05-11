"use strict";

(function() { // for encapsulation and scoping

    const BASE_URL = "http://localhost:4567"

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

        let filters = qsa('#filter-by-list li');
        filters.forEach(el => {
            el.addEventListener('click', itemFilter)
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
    async function populateContent() {
        let userName = getUserName();
        if (userName == "") {
            window.location.href = "login.html"
        }
        let params = new FormData()
        params.append('userName', getUserName())
        let res;
        try {
            res = await fetch(BASE_URL + '/items/get', { method: "POST", body: generateRequestBody(params), mode: 'cors' })
            checkStatus(res)
            res = await res.json();
        } catch (err) {
            alert(err)
            window.location.href = "login.html"
        }
        
        res.Items.forEach(item => {
            let li = gen('li')
            li.classList.add('item')
            li.dataset.purhcaser = item.userName
            li.dataset.expiration = item.expiration
            li.dataset.category = item.category

            if (item.shared == 1) {
                li.dataset.sharing = "shared"
            } else {
                li.dataset.sharing = "personal"
            }

            let span = gen('span')
            span.textContent = item.itemName

            let p = gen('p')
            p.classList.add('align-text-right', 'expiration-indicator')
            p.dataset.days = numDaysUntil(item.expiration)

            li.append(span)
            li.append(p)
            
            if (item.storage == 0) {
                li.dataset.location = "Refrigerator"
                id('fridge-list').appendChild(li)
            } else { // item.storage == 1
                li.dataset.location = "Pantry"
                id('pantry-list').appendChild(li)
            }

        })

        id('days-btn').click();

    }

    function numDaysUntil(date) {
        const date1 = new Date();
        const date2 = new Date(date);

        // One day in milliseconds
        const oneDay = 1000 * 60 * 60 * 24;

        // Calculating the time difference between two dates
        const diffInTime = date2.getTime() - date1.getTime();

        // Calculating the no. of days between two dates
        const diffInDays = Math.round(diffInTime / oneDay);

        return diffInDays;
    }

    function checkStatus(res) {
        if (res.status == 200) {
            return res
        } else if (res.status == 409) {
            throw new Error('Your username was not found. Please login again.')
        }
    }

    function itemFilter() {
        if (this.textContent === "Show all") {
            let items = qsa('.item')
            items.forEach(item => {
                item.classList.remove('hidden');
            })
            clearAllChecks('#filter-by-list li')
            id('show-all').prepend(createCheckMark());
            return;
        }

        let items = qsa('.item')
        items.forEach(item => {
            item.classList.add('hidden');
        })

        if (id('show-all').firstElementChild) {
            id('show-all').firstElementChild.remove();
        }

        let unchecking = false;

        if (this.firstElementChild) {
            this.firstElementChild.remove();
            unchecking = true;
        }

        if (!unchecking) {
            this.prepend(createCheckMark());
        }

        items.forEach(item => {
            if (id("personal-filter").firstElementChild && item.dataset.sharing === "personal") {
                item.classList.remove('hidden')
            }
            if (id("shared-filter").firstElementChild && item.dataset.sharing === "shared") {
                item.classList.remove('hidden')
            }
            let daysRemaining = parseInt(item.lastElementChild.dataset.days)
            if (id("expired-filter").firstElementChild && daysRemaining <= 0) {
                item.classList.remove('hidden')
            }
            if (id("expiring-filter").firstElementChild && daysRemaining <= 3 && daysRemaining > 0) {
                item.classList.remove('hidden')
            }
        })

    }

    /**
     * clears all check marks from the modal
     */
    function clearAllChecks(selector) {
        let sortings = qsa(selector);
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
        clearAllChecks('#sort-by-list li');
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