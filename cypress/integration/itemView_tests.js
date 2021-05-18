// Testing suite for itemView.html

context('Items Tests', () => {
    beforeEach(() => {
        cy.visit('https://pocket-grocer-403.azurewebsites.net/itemView.html?item=almond%20milk&itemID=13&purchaser=cooper&expiration=2021-05-17&location=Refrigerator&category=Dairy&sharing=shared&days=0')
    })

    it('Ensure item name was populated correctly', function () {
        
        cy.get('[data-cy=item]')
            .should('be.visible')
            .and('contain', 'almond milk')
    })

    it('Ensure purchaser was populated correctly', function () {
        
        cy.get('[data-cy=purchaser]')
            .should('be.visible')
            .and('contain', 'cooper')
    })

    it('Ensure expiration was populated correctly', function () {
        
        cy.get('[data-cy=expiration]')
            .should('be.visible')
            .and('contain', '2021-05-17')
        
    })

    it('Ensure storage location was populated correctly', function () {
        
        cy.get('[data-cy=location]')
            .should('be.visible')
            .and('contain', 'Refrigerator')

    })

    it('Ensure category was populated correctly', function () {
        
        cy.get('[data-cy=category]')
            .should('be.visible')
            .and('contain', 'Dairy')
    })

    it('Ensure sharing slider was populated correctly', function () {
        
        cy.get('[data-cy=sharing]')
            .should('be.checked')

    })

})