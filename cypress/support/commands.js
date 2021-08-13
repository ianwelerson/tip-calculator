// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('tipCalculation', ({ manual }) => {
  cy.get('#billValue input').type('100')
  
  if (manual) {
    cy.get('#customTip input').type('10')
    cy.get('#numberOfPersons input').type('2')
    
    cy.get('#tipAmount').should('have.text', '5')
    cy.get('#totalValue').should('have.text', '55')
  } else {
    cy.get('[name=tipPercent][value=50]').check({force: true})
    cy.get('#numberOfPersons input').type('2')

    cy.get('#tipAmount').should('have.text', '25')
    cy.get('#totalValue').should('have.text', '75')
  }
})
