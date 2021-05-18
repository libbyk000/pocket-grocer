// Testing suite for addItem.html

context('addItem Tests', () => {
    beforeEach(() => {
        cy.visit('https://pocket-grocer-403.azurewebsites.net/addItem.html')
    })

    it ('Ensure item name can be typed', function () {
        // at first, no option should be selected
        cy.get('#item-name-input')
        .should('have.value', '')

        // confirm the apple was selected
        cy.get('#item-name-input')
        .type('apple')
        .should('have.value', 'apple')
    })

    it ('Ensure item category can be selected', function () {
        // at first, no option should be selected
        cy.get('#item-category')
        .should('have.value', '')

        
        // Select option(s) with matching text content
        cy.get('#item-category').select('Beverages')
        cy.get('#item-category').should('have.value', 'Beverages')
    })
})