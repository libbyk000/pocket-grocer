// Testing suite for login.html

context('Login Tests', () => {
    beforeEach(() => {
        cy.visit('https://pocket-grocer-403.azurewebsites.net/login.html')
    })

    it('Ensure username takes input', function () {
        cy.get('[data-cy=username]')
        .type('testString')
        .should('have.value', 'testString')
    })

    it('Ensure password takes input', function () {
        cy.get('[data-cy=password]')
        .type('testString')
        .should('have.value', 'testString')
    })

    it('Ensure Create Account link redirects', function () {
        cy.get('[data-cy=signup]')
        .click()
        
        cy.url()
        .should('include', '/signup.html')
    })
})