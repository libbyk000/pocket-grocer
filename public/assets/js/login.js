(function() {

    const BASE_URL = 'http://localhost:4567'

    window.addEventListener('load', init)

    function init() {
        qs('form').addEventListener('submit', login)
    }

    function login(e) {
        e.preventDefault();

        let url = BASE_URL + '/users/login'
        fetch(url, {method: "POST", body: generateRequestBody(new FormData(qs('form'))), mode: 'cors'})
            .then(clearErrors)
            .then(checkStatus)
            .then(res => res.text())
            .then(handleResponse)
            .catch(console.error)
    }

    function clearErrors(res) {
        id('username-error').innerHTML = "";
        id('password-error').innerHTML = "";
        qs('input[name=userName]').classList.remove('error')
        qs('input[name=password]').classList.remove('error')
        return res;
    }

    async function checkStatus(res) {
        if (res.status === 200) {
            return res
        } else {
            if (res.status === 409) {
                qs('input[name=userName]').classList.add('error')
                id('username-error').textContent = "*Username does not exist"
            } else if (res.status === 400) {
                qs('input[name=password]').classList.add('error')
                id('password-error').textContent = "*Incorrect password"
            }
            throw new Error(await res.text());
        }
    }

    function handleResponse(res) {

        document.cookie = "userName=" + qs('input[name=userName]').value;
        window.location.href = "items.html"
        
    }

})();