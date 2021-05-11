"use strict"; // for error reporting

(function() { // for encapsulation and scoping

    const urlParams = new URLSearchParams(window.location.search);

    window.addEventListener('load', init)

    function init() {

        populateContent();
        id('delete-item-btn').addEventListener('click', deleteItem)

    }

    /**
     * populate the page with the item's name, purchaser, expiration,
     * storage location, category, and number of days remaining
     */
    function populateContent() {

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

        qs('.slider').addEventListener('click', toggleSharing)
    }

    /**
     * toggles a flag on the item that indicates it is intended to either
     * be shared amongst all housemates, or exclusively used by the currently logged in user
     */
    function toggleSharing() {
        fetch(BASE_URL + '/items/shared')
            .then(checkStatus)
            .catch(handleError)
    }

    /**
     * attempt to remove the item from the currently logged in user's digital
     * pantry/fridge
     */
    function deleteItem() {

        let params = new FormData()
        params.append('itemID', urlParams.get('itemID'))
        fetch(BASE_URL + '/items/delete', {method: "POST", mode:'cors', body: params})
            .then(checkStatus)
            .then(res => {
                alert("Item successfully deleted.")
                window.location.href = "items.html"
            })
            .catch(handleError)

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
                message = ITEM_DNE_ERR
            }
            throw new Error(message)
        }
    }

    /**
     * alerts the user in an appropriate and informative way that an error has occurred,
     * and then takes appropriate action
     * 
     * @param {object} err - object representing an error that occurred
     */
    function handleError(err) {
        alert(err)
        if (err.message == ITEM_DNE_ERR) {
            window.location.href = "items.html"
        }
    }

})()