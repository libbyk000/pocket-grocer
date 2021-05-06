// Testing suite for index.html
// Also known as the landing page

describe('Index Tests', function() {
    it('Ensure sign up button properly redirects to signup.html', function () {
        cy.visit('https://pocket-grocer-403.azurewebsites.net')
        cy.get('[data-cy=signup]')
    })
})

// cy.get() uses css selectors
// example
// cy.get()
// .type('somefake@email.com')
// .should('have.value', 'somefake@email.com')