"use strict"; // for error reporting

(function() { // for encapsulation and scoping

    window.addEventListener('load', init)

    function init() {

        populateContent();

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
     * populate the page with all items in the digital pantry and refrigerator
     * of the currently logged in user's group (the group may have no other users in it)
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
            if (err.message == USER_DNE_ERR) {
                window.location.href = "login.html"
            }
        }
        
        res.Items.forEach(item => {
            let li = gen('li')
            li.classList.add('item')
            li.dataset.purchaser = item.userName
            li.dataset.expiration = item.expiration
            li.dataset.category = item.category
            li.dataset.itemID = item.itemID

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

            li.addEventListener('click', showItemView)
            
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

    /**
     * calculates and returns the number of days (rounded to the nearest whole number) between now
     * and the specified date
     * 
     * @param {string} date - string representing a date in the format: "YYYY-MM-DD"
     * @returns {number} - number of days (rounded to nearest integer) between today and the given date
     */
    function numDaysUntil(date) {
        const date1 = new Date();
        const date2 = new Date(date);

        // One day in milliseconds
        const oneDay = 1000 * 60 * 60 * 24;

        // Calculating the time difference between two dates
        const diffInTime = date2.getTime() - date1.getTime();

        // Calculating the no. of days between two dates
        const diffInDays = Math.round(diffInTime / oneDay);

        return diffInDays + 1;
    }

    /**
     * checks the status code of the response from the server, and throws
     * an appropriate error in the case it recognizes a known error code, or
     * an otherwise generic error
     * 
     * @param {object} res - object representing the response from the server
     * @returns {object} the unmodified parameter
     */
    function checkStatus(res) {
        if (res.status == 200) {
            return res
        } else {
            let message = GENERIC_SERVER_ERR
            if (res.status == 409) {
                message = USER_DNE_ERR
            }
            throw new Error(message)
        }
        
    }

    /**
     * hides items from the page that do not fit the selected criteria
     */
    function itemFilter() {
        if (this.textContent === "Show all") {
            let items = qsa('.item')
            items.forEach(item => {
                item.classList.remove('hidden');
            })
            clearAllChecks('#filter-by-list li')
            id('show-all').prepend(createCheckMark());
        } else {
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

    }

    /**
     * removes all selections from the given section in the filter/sort popup
     * 
     * @param {string} selector - CSS selector corresponding to the DOM element to remove selections from
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
     * organizes items in the pantry and refrigerator according to the selected sorting
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
        url += "&itemID=" + this.dataset.itemID
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