// Testing suite for items.html

context('Items Tests', () => {
    beforeEach(() => {
        cy.visit('https://pocket-grocer-403.azurewebsites.net/items.html')
    })

    it('Ensure sort/filter popup works', function () {
        cy.get('[data-cy=sort-filter-btn]')
            .click()
        
        cy.get('[data-cy=sort-filter-modal]')
            .should('be.visible')
    })

})