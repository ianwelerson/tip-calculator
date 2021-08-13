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
Cypress.Commands.add('tipCalculation', ({ manual }) => {
  cy.get('#billValue input').type('100')
  let tipAmount
  let numberOfPersons
  
  if (manual) {
    cy.get('#customTip input').type('10')

    tipAmount = '5'
    numberOfPersons = '55'
  } else {
    cy.get('[name=tipPercent][value=50]').check({ force: true })
    
    tipAmount = '25'
    numberOfPersons = '75'
  }

  cy.get('#numberOfPersons input').type('2')

  cy.get('#tipAmount').should('have.text', tipAmount)
  cy.get('#totalValue').should('have.text', numberOfPersons)
})
