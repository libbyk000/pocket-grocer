"use strict"; // for error reporting

(function() { // for encapsulation and scoping

    const BASE_URL = 'http://localhost:4567'

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
                id('quantity').value = - 1;
            }
        })
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

        data.delete('recent-purchase')

        let shared = 1
        if (id('personal-checkbox').checked) {
            shared = 0;
        }
        data.set('shared', shared)

        data.append('userName', getUserName())

        console.log(generateRequestBody(data))

        fetch(BASE_URL + '/items/add', {method: "POST", mode: 'cors', body: generateRequestBody(data)})
            .then((res) => {
                if (res.status == 200) {
                    return res
                } else if (res.status == 409) {
                    throw new Error('Your username was not found. Please login again.')
                }
            })
            .then((res) => {
                console.log(res)
                alert('Item successfully added!')
                window.location.href = "items.html"
            })
            .catch((err) => {
                if (err.message == "Your username was not found. Please login again.") {
                    alert(err)
                    window.location.href = "login.html"
                } else {
                    console.error(err)
                }
            })

    }

})()