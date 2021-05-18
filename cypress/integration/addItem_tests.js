// Testing suite for addItem.html

context('addItem Tests', () => {
    beforeEach(() => {
        cy.visit('https://pocket-grocer-403.azurewebsites.net/addItem.html')
    })

    // BOUGHT RECENTLY
    it ('Bought recently checked', function () {
        // .check() accepts a value argument
        cy.get('#yes')
        .check({ force: true })
        .should('be.checked')

        cy.get('#no')
        .check({ force: true })
        .should('be.checked')
    })

    // ITEM NAME
    it ('Ensure item name can be typed', function () {
        // at first, no option should be selected
        cy.get('#item-name-input')
        .should('have.value', '')

        // confirm the apple was selected
        cy.get('#item-name-input')
        .type('apple')
        .should('have.value', 'apple')
    })

    // QUANTITY
    it ('Increment quantity - valid', function () {
        // Start value
        cy.get('#quantity')
        .should('have.value', 1)

        // increment
        cy.get('#plus')
        .click()

        cy.get('#quantity')
        .should('have.value', 2)
    })

    it ('Decrement quantity - invalid', function () {
        // Start value
        cy.get('#quantity')
        .should('have.value', 1)

        cy.get('#minus')
        .click()
    
        cy.get('#quantity')
        .should('have.value', 1)
    })

    it ('Increment then decrement quantity - valid', function () {
        // Start value
        cy.get('#quantity')
        .should('have.value', 1)

        // increment
        cy.get('#plus')
        .click()

        cy.get('#quantity')
        .should('have.value', 2)

        cy.get('#minus')
        .click()
    
        cy.get('#quantity')
        .should('have.value', 1)
    })


    // STORAGE LOCATION 
    it ('Storage location checked', function () {
        // .check() accepts a value argument
        cy.get('#pantry-tag')
        .check({ force: true })
        .should('be.checked')

        cy.get('#refrigerator-tag')
        .check({ force: true })
        .should('be.checked')
    })

    // ITEM CATEGORY
    it ('Ensure item category can be selected', function () {
        // at first, no option should be selected
        cy.get('#item-category')
        .should('have.value', '')

        
        // Select option(s) with matching text content
        cy.get('#item-category').select('Beverages')
        cy.get('#item-category').should('have.value', 'Beverages')
    })
})