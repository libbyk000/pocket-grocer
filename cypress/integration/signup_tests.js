// Testing suite for signup.html

describe('Signup Tests', function() {
    it('Ensure first name takes input', function () {
        cy.visit('https://pocket-grocer-403.azurewebsites.net/signup.html')
        cy.get('[data-cy=first-name]')
        .type('testString')
        .should('have.value', 'testString')
    })

    it('Ensure last name takes input', function () {
        cy.visit('https://pocket-grocer-403.azurewebsites.net/signup.html')
        cy.get('[data-cy=last-name]')
        .type('testString')
        .should('have.value', 'testString')
    })

    it('Ensure username takes input', function () {
        cy.visit('https://pocket-grocer-403.azurewebsites.net/signup.html')
        cy.get('[data-cy=username]')
        .type('testString')
        .should('have.value', 'testString')
    })

    it('Ensure password takes input', function () {
        cy.visit('https://pocket-grocer-403.azurewebsites.net/signup.html')
        cy.get('[data-cy=password]')
        .type('testString')
        .should('have.value', 'testString')
    })

    it('Ensure confirm password takes input', function () {
        cy.visit('https://pocket-grocer-403.azurewebsites.net/signup.html')
        cy.get('[data-cy=confirm-password]')
        .type('testString')
        .should('have.value', 'testString')
    })
})