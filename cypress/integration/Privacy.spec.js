/// <reference types="Cypress" />

Cypress._.times(3, function(){
    
it('Testa a pagina da politica de privacidade de forma independete', function(){
    cy.visit('./src/privacy.html')

    cy.contains('Talking About Testing').should('be.visible')
})
})