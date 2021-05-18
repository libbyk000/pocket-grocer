// Testing suite for index.html
// Also known as the landing page

context('Index Tests', () => {
    beforeEach(() => {
        cy.visit('https://pocket-grocer-403.azurewebsites.net/')
    })

    it('Ensure sign up button properly redirects to signup.html', function () {
        cy.visit('https://pocket-grocer-403.azurewebsites.net')
        cy.get('[data-cy=signup]')
        .click()
        
        cy.url()
        .should('include', '/signup.html')
    })
})