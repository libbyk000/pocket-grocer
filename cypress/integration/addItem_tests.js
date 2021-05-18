// Testing suite for addItem.html

context('addItem Tests', () => {
    beforeEach(() => {
        cy.visit('https://pocket-grocer-403.azurewebsites.net/addItem.html')
    })

    it('all radios can be checked', function () {
        cy.get('[type="radio"]')
        .not('[disabled]')
        .check().should('be.checked')
    })

    it('all radios can be unchecked', function () {
        cy.get('[type="radio"]')
        .not('[disabled]')
        .uncheck().should('not.be.checked')
    })

    it ('Ensure item name can be selected', function () {
        // at first, no option should be selected
        cy.get('#item-name-input')
        .should('have.value', '')

        cy.get('#item-name-input').select('apple')
        // confirm the apple was selected
        cy.get('#item-name-input').should('have.value', 'apple')
    })

    it ('Ensure item category can be selected', function () {
        // at first, no option should be selected, rep by -
        cy.get('#item-category')
        .should('have.value', '-')

        
        // Select option(s) with matching text content
        cy.get('#item-category').select('Beverages')

        cy.get('#item-category').should('have.value', 'Beverages')
    })
})