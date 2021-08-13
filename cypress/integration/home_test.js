describe('tip calculator', () => {
  it('make a calc with manual tip', () => {
    cy.visit('localhost:8080')

    cy.tipCalculation({ manual: true })
  })

  it('make a calc with avalilable tip options', () => {
    cy.visit('localhost:8080')

    cy.tipCalculation({ manual: false })
  })

  it('can reset the values', () => {
    cy.visit('localhost:8080')

    cy.tipCalculation({ manual: false })

    cy.get('#resetValues').click()

    cy.get('#billValue input').should('have.value', '')
    cy.get('#customTip input').should('have.value', '')
    cy.get('[name=tipPercent]').should('not.be.checked');
    cy.get('#numberOfPersons input').should('have.value', '')
  })

  it('throw a field error if the value is invalid', () => {
    cy.visit('localhost:8080')

    cy.get('#billValue input').type('0')
    cy.get('#billValue').should('have.class', 'input-group--has-error')

    cy.get('#numberOfPersons input').type('0')
    cy.get('#numberOfPersons').should('have.class', 'input-group--has-error')
  })
})
