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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// Type a calculation
Cypress.Commands.add('calcABill', ({ bill, tip, person, manualTip }) => {
  cy.get('[data-testid=bill-input-group] [name=bill]').type(bill)
  cy.get('[data-testid=person-input-group] [name=person]').type(person)

  if (manualTip) {
    cy.get('[data-testid=tip-input-group] [name=tip-manual]').type(tip)
  } else {
    cy.get(`[data-testid=tip-input-group] [value=${tip}]`).check({ force: true })
  }
})
