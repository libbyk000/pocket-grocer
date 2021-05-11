"use strict"; // for error reporting

(function() { // for encapsulation and scoping

     window.addEventListener('load', init)

     function init() {
          qs('form').addEventListener('submit', createAccount)
     }

     /**
      * attempts to create an account with the inputted credentials
      * 
      * @param {*} e - object representing the submit event
      */
     function createAccount(e) {
          e.preventDefault();

          clearErrors();

          if (id('password').value !== id('confirm-password').value) {
               id('confirm-password-error').textContent = "*Passwords must match"
               id('password').classList.add('error')
               id('confirm-password').classList.add('error')
          }
          fetch(BASE_URL + 'users/add')
               .then(checkStatus)
               .then((res) => {
                    window.location.href = "items.html"
               })
               .catch(err => {
                    if (err.message = "There was an error creating your account. Please try again later.") {
                         alert(err)
                    } else if (err.message = '*Username taken') {
                         id('username-error').textContent = err.message
                         id('username').classList.add('error')
                    }
               })
     }

     /**
     * checks the status code of the response from the server, and throws
     * an appropriate error in the case it recognizes a known error code, or
     * an otherwise generic error
     *
     * @param {object} res - object representing the response from the server
     * @returns {object} - unmodified parameter
     */
     function checkStatus(res) {
          if (res.status == 200) {
               return res
          } else if (res.status == 409) {
               throw new Error('*Username taken')
          } else if (res.status == 400) {
               throw new Error('There was an error creating your account. Please try again later.')
          }
     }

     /**
      * clears all error indicators and messages from the page
      */
     function clearErrors() {
          id('username-error').innerHTML = ""
          id('confirm-password-error').innerHTML = ""
          id('password').classList.remove('error')
          id('confirm-password').classList.remove('error')
          id('username').classList.remove('error')
     }

})()