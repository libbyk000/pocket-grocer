(function() {

    window.addEventListener('load', init)

    function init() {
        qs('form').addEventListener('submit', login)

        fetch('http://localhost:4567/hello', {mode: 'cors'})
            .then(checkStatus)
            .then(res => res.text())
            .then(console.log)
            .catch(console.error)
    }

    function login(e) {
        e.preventDefault();

        let params = new FormData(qs('form'))
        let data = {
            userName: 'cooper',
            password: 'pass2'
        }
        let url = 'http://localhost:4567/users/login'
        fetch(url, {method: "POST", body: JSON.stringify(data), mode: 'cors'})
            .then(res => res.text())
            .then(handleResponse)
            .catch(console.error)
    }

    function handleResponse(res) {

        // TODO: check for status codes
        
    }

})();