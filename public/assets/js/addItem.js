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

        id('plus').addEventListener('click', () => {
            id('quantity').value = parseInt(id('quantity').value) + 1;
        })
        id('minus').addEventListener('click', () => {
            let currentQuantity = parseInt(id('quantity').value)
            if (currentQuantity > 1) {
                id('quantity').value = id('quantity').value - 1;
            }
        })
    }

    /**
     * populate the item dropdown with either 1k of the most commonly purchased items,
     * or a list of items recently purchased by the logged in user.
     * Based on user input from the radio button titled: "have you purchased this recently?"
     */
    function updateItemDropdown() {
        id('item-name').innerHTML = "";
        if (this.id === "no") {
            INGREDIENTS.forEach(ingredient => {
                let entry = document.createElement('option')
                entry.textContent = ingredient.name
                id('item-name').appendChild(entry);
            })
        } else { // this.id === "yes"
            
            let params = new FormData();
            params.append('userName', getUserName())

            fetch(BASE_URL + '/items/getRecent', { method: "POST", body: generateRequestBody(params)})
                .then(res => {
                    let message = GENERIC_SERVER_ERR
                    if (res.status == 200 || res.status == 0) {
                        return res
                    } else if (res.status == 409) {
                        message = USER_DNE_ERR
                    }
                    throw new Error(message);
                })
                .then(res => res.json())
                .then(res => {
                    let items = res.Items;
                    items.forEach(item => {
                        let entry = document.createElement('option')
                        entry.textContent = item.itemName
                        id('item-name').appendChild(entry);
                    })
                })
        }
    }

    /**
     * add item to the user's digital pantry/fridge
     * and then navigate back to the items view
     * 
     * @param {object} e - object representing the submit event
     */
    function submitForm(e) {
        e.preventDefault();
        let data = new FormData(qs('form'));

        data.delete('recent-purchase')

        let shared = 1
        if (id('personal-checkbox').checked) {
            shared = 0;
        }
        data.set('shared', shared)

        data.append('userName', getUserName())

        fetch(BASE_URL + '/items/add', {method: "POST", body: generateRequestBody(data)})
            .then((res) => {
                if (res.status == 200) {
                    return res
                } else {
                    let message = GENERIC_SERVER_ERR
                    if (res.status == 409) {
                        message = USER_DNE_ERR
                    }
                    throw new Error(message)
                }
                
            })
            .then((res) => {
                alert('Item successfully added!')
                window.location.href = "items.html"
            })
            .catch((err) => {
                alert(err)
                if (err.message == USER_DNE_ERR) {
                    window.location.href = "login.html"
                }
            })

    }

})()