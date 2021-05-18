// Testing suite for account.html

context('Account Tests', () => {
    beforeEach(() => {
        cy.visit('https://pocket-grocer-403.azurewebsites.net/account.html')
    })

    it('Ensure new group name takes input', function () {
        cy.get('[data-cy=new-group-name]')
            .type('testString')
            .should('have.value', 'testString')
    })

    it('Ensure existing group name takes input', function () {
        cy.get('[data-cy=existing-group-name]')
            .type('testString')
            .should('have.value', 'testString')
    })

})