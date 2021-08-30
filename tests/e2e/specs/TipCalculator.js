// https://docs.cypress.io/api/introduction/api.html

describe('Tip Calculator Test', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('calculate the correct tip amount and total per person using manual tip', () => {
    cy.calcABill({
      manualTip: true,
      bill: 100,
      tip: 8,
      person: 2
    })

    cy.get('[data-testid=tip-per-person]').should('have.text', '$4')
    cy.get('[data-testid=total-per-person]').should('have.text', '$54')
  })

  it('calculate the correct tip amount and total per person predefined tip', () => {
    cy.calcABill({
      manualTip: false,
      bill: 100,
      tip: 50,
      person: 2
    })

    cy.get('[data-testid=tip-per-person]').should('have.text', '$25')
    cy.get('[data-testid=total-per-person]').should('have.text', '$75')
  })

  it('clear the preselected tip if users type in custom tip', () => {
    const tipValue = 50

    cy.calcABill({
      manualTip: false,
      bill: 100,
      tip: tipValue,
      person: 2
    })

    cy.get('[data-testid=tip-input-group] [name=tip-manual]').type(8)

    cy.get(`[data-testid=tip-input-group] [value=${tipValue}]`).should('not.be.checked')
  })

  it('clear the manual tip if users selected a predefined tip', () => {
    cy.calcABill({
      manualTip: true,
      bill: 100,
      tip: 8,
      person: 2
    })

    cy.get('[data-testid=tip-input-group] [value=50]').check({ force: true })

    cy.get('[data-testid=tip-input-group] [name=tip-manual]').should('have.value', '')
  })

  it('reset tip calculation', () => {
    cy.calcABill({
      manualTip: true,
      bill: 100,
      tip: 8,
      person: 2
    })

    cy.get('[data-testid=reset-action]').click()

    cy.get('[data-testid=tip-per-person]').should('have.text', '$0')
    cy.get('[data-testid=total-per-person]').should('have.text', '$0')
  })
})
