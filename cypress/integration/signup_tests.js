// Testing suite for signup.html

context('SignUp Tests', () => {
    beforeEach(() => {
        cy.visit('https://pocket-grocer-403.azurewebsites.net/signup.html')
    })

    it('Ensure first name takes input', function () {
        cy.get('[data-cy=first-name]')
        .type('testString')
        .should('have.value', 'testString')
    })

    it('Ensure last name takes input', function () {
        cy.get('[data-cy=last-name]')
        .type('testString')
        .should('have.value', 'testString')
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

    it('Ensure confirm password takes input', function () {
        cy.get('[data-cy=confirm-password]')
        .type('testString')
        .should('have.value', 'testString')
    })
})