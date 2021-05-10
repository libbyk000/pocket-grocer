"use strict";

(function() {

     const BASE_URL = "http://localhost:4567/"

     window.addEventListener('load', init)

     function init() {
          qs('form').addEventListener('submit', createAccount)
     }

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

     function checkStatus(res) {
          if (res.status == 200) {
               return res
          } else if (res.status == 409) {
               throw new Error('*Username taken')
          } else if (res.status == 400) {
               throw new Error('There was an error creating your account. Please try again later.')
          }
     }

     function clearErrors() {
          id('confirm-password-error').innerHTML = ""
          id('password').classList.remove('error')
          id('confirm-password').classList.remove('error')
     }

})()