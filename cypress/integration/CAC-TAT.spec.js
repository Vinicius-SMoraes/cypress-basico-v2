/// <reference types="Cypress" />
describe('Central de Atendimento ao Cliente TAT', function() {
    const THREE_SECONDS_IN_MS = 3000
    beforeEach(function(){
        cy.visit("./src/index.html")
    })
    it('verifica o título da aplicação', function() {
        cy.title().should("eq" , "Central de Atendimento ao Cliente TAT")
    })

    Cypress._.times(3, function(){
        it.only('preenche os campos obrigatórios e envia o formulário', ()=>{

            cy.clock()
    
            cy.get('#firstName').type('vinicius')
            cy.get('#lastName').type('moraes')
            cy.get('#email').type('vinimoraes@gmail.com')
            cy.get('#open-text-area').type('Aprender mais sobre automação de testes e suas nuances. Conto com vocês.{}', ({delay:5}))
            cy.get('.button').click()
            cy.get('span.success').should('be.visible')
    
            cy.tick(THREE_SECONDS_IN_MS)
    
            cy.get('span.success').should('not.be.visible')
    
        })
    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', ()=>{

        cy.clock()
        cy.get('#firstName').type('vinicius')
        cy.get('#lastName').type('moraes')
        cy.get('#email').type('vinimoraes.gmail.com')
        cy.get('#open-text-area').type('Aprender mais sobre automação de testes e suas nuances. Conto com vocês.{}', ({delay:5}))
        cy.get('.button').click()
        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')

    })

    it('verifica se o campo do telefone de fato só está aceitando valores numericos', ()=>{
        cy.get('#firstName').type('vinicius')
        cy.get('#lastName').type('moraes')
        cy.get('#email').type('vinimoraes@gmail.com')
        cy.get('#open-text-area').type('Aprender mais sobre automação de testes e suas nuances. Conto com vocês.{}', ({delay:5}))
        cy.get('#phone').type('um número qualquer').should(($phone) => {
            const text = $phone.text()
        
            expect(text).not.to.include('um numero qualquer')
          })
        cy.get('.button').click()
        cy.get('span.success').should('be.visible')
    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', ()=>{
        cy.clock()
        cy.get('#firstName').type('vinicius')
        cy.get('#lastName').type('moraes')
        cy.get('#email').type('vinimoraes@gmail.com')
        cy.get('#phone-checkbox').check().should('be.checked')
        cy.get('#open-text-area').type('Aprender mais sobre automação de testes e suas nuances. Conto com vocês.', ({delay:5}))
        cy.get('.button').click()
        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', ()=>{
        cy.get('#firstName').type('vinicius').should('have.value','vinicius').clear().should('have.value','')
        cy.get('#lastName').type('moraes').should('have.value','moraes').clear().should('have.value','')
        cy.get('#email').type('vinimoraes@gmail.com').should('have.value','vinimoraes@gmail.com').clear().should('have.value', '')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Aprender mais sobre automação de testes e suas nuances. Conto com vocês.', ({delay:5}))
        cy.get('.button').click()
        cy.get('.error').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', ()=>{
        cy.clock()
        cy.get('.button').click()
        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')
    })

    it('Teste de comando personalizado', ()=>{
        cy.clock()
        cy.PreencheFormularioEEnvia()
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')

    })

// Testes que usam o .SELECT <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


    it('select the option youtube on a dropbox', ()=>{
        cy.get('#product')
         .select('YouTube')
         .should('have.value','youtube')
    })
    
    it('select the option "mentoria" on the dropbox',()=>{
        cy.get('#product')
         .select('mentoria')
         .should('have.value','mentoria')
    })

    it('select an element of the dropbox by its index', ()=>{
        cy.get('#product')
         .select(1)
         .should('have.value', 'blog')
    })

// Testes que usam o CHECK para testar elementos tipo radio <<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>

    it('selects the "feedback" radio button', ()=>{
        cy.get('input[type=radio]')
            .check('feedback')
            .should('be.checked')
    })

    it('checks every type of radio button', function(){
        cy.get('input[type=radio]')
        .should('have.length', 3)
        .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })

    //jeito que eu fiz uso do CHECK
    it('checks both check-box then uncheck the last', ()=>{
        cy.get('#email-checkbox').check().should('be.checked')
        cy.get('#phone-checkbox').check().should('be.checked')
        cy.get('#phone-checkbox').uncheck().should('not.be.checked')
    })
    //jeito mais otimizado 
    it('seleciona as duas check-box e desmarca a ultima', ()=>{
        cy.get('input[type="checkbox"]')
            .check()
            .last()
            .uncheck()
            .should('not.be.checked')
    })


// TESTA UPLOAD DE ARQUIVOS //////////////////////////////////////////
    it('loads a file through the click command', () =>{
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })   
    })

    it('loads a file through the drag-and-drop functionality', ()=>{
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', {action:"drag-drop"})
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', ()=>{
        cy.fixture('example.json').as('arquivoExemplo')
        cy.get('input[type="file"]')
            .selectFile('@arquivoExemplo')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

// TESTA LINKS QUE ABREM EM OUTRA PÁGINA DO NAVEGADOR/////////////////////////////////////////////////////////////
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', ()=>{
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })
    it('acessa a página da política de privacidade removendo o target e então clicando no link', ()=>{
        cy.get('#privacy a')   
            .invoke('removeAttr', 'target')
            .click()
        cy.contains('Talking About Testing').should('be.visible')
    })

    it('testa a página da política de privacidade de forma independente')

  })
