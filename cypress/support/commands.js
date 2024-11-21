
Cypress.Commands.add('PreencheFormularioEEnvia', ()=>{
    cy.get('#firstName').type('vinicius')
    cy.get('#lastName').type('moraes')
    cy.get('#email').type('vinimoraes@gmail.com')
    cy.get('#open-text-area').type('Aprender mais sobre automação de testes e suas nuances. Conto com vocês.{}', ({delay:5}))
    cy.get('.button').click()
    cy.get('span.success').should('be.visible')
})