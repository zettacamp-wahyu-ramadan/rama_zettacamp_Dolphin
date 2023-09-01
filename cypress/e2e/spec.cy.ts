describe('Login Test', () => {
  it('Do Login', () => {
      cy.visit('http://localhost:4200')
      // Type name
      cy.get('[data-cy=input-name]').type('wramadan7').wait(200)
      // Type passsword
      cy.get('[data-cy=input-password]').type('blabal1231s').wait(200)
      // Click login
      cy.get('[data-cy=btn-login]').click().wait(2000)
  })
})

describe('Select Items Test', () => {
  before(() => {
    cy.visit('http://localhost:4200')
    // Type name
    cy.get('[data-cy=input-name]').type('wramadan7').wait(200)
    // Type passsword
    cy.get('[data-cy=input-password]').type('blabal1231s').wait(200)
    // Click login
    cy.get('[data-cy=btn-login]').click().wait(2000)
  })

  it('Do select items', () => {
    // Click item 1
    cy.get('[data-cy=btn-add-menu-item-to-cart]').eq(0).click({ shiftKey: true })
    cy.get('[data-cy=input-cart-item-amount]').eq(0).should('contain.value', 1)
    cy.get('[data-cy=text-cart-item-name]').eq(0).should('contain', 'Latte').wait(2000)

    // Click item 2
    cy.get('[data-cy=btn-add-menu-item-to-cart]').eq(2).click({ shiftKey: true })
    cy.get('[data-cy=input-cart-item-amount]').eq(1).should('contain.value', 1)
    cy.get('[data-cy=text-cart-item-name]').eq(1).should('contain', 'Espresso').wait(2000)

    // Click item 3
    cy.get('[data-cy=btn-add-menu-item-to-cart]').eq(2).click({ shiftKey: true })
    cy.get('[data-cy=input-cart-item-amount]').eq(1).should('contain.value', 2)
    cy.get('[data-cy=text-cart-item-name]').eq(1).should('contain', 'Espresso').wait(2000)
  })
})

describe('Checkout Test', () => {
  before(() => {
    cy.visit('http://localhost:4200')
    // Type name
    cy.get('[data-cy=input-name]').type('wramadan7').wait(200)
    // Type passsword
    cy.get('[data-cy=input-password]').type('blabal1231s').wait(200)
    // Click login
    cy.get('[data-cy=btn-login]').click().wait(2000)

    // Click item 1
    cy.get('[data-cy=btn-add-menu-item-to-cart]').eq(0).click({ shiftKey: true })
    cy.get('[data-cy=input-cart-item-amount]').eq(0).should('contain.value', 1)
    cy.get('[data-cy=text-cart-item-name]').eq(0).should('contain', 'Latte').wait(2000)

    // Click item 2
    cy.get('[data-cy=btn-add-menu-item-to-cart]').eq(2).click({ shiftKey: true })
    cy.get('[data-cy=input-cart-item-amount]').eq(1).should('contain.value', 1)
    cy.get('[data-cy=text-cart-item-name]').eq(1).should('contain', 'Espresso').wait(2000)

    // Click item 3
    cy.get('[data-cy=btn-add-menu-item-to-cart]').eq(2).click({ shiftKey: true })
    cy.get('[data-cy=input-cart-item-amount]').eq(1).should('contain.value', 2)
    cy.get('[data-cy=text-cart-item-name]').eq(1).should('contain', 'Espresso').wait(2000)
  })

  it ('Do checkout item', () => {
    // Click checkout
    cy.get('[data-cy=btn-checkout]').click()
    cy.get('[data-cy=alert-message]').should('contain', 'Items Purchased').wait(2000)
  })
})

describe('Logout Test', () => {
  before(() => {
    cy.visit('http://localhost:4200')
    // Type name
    cy.get('[data-cy=input-name]').type('wramadan7').wait(200)
    // Type passsword
    cy.get('[data-cy=input-password]').type('blabal1231s').wait(200)
    // Click login
    cy.get('[data-cy=btn-login]').click().wait(2000)
  })

  it('Do logout', () => {
    // Click logout
    cy.get('[data-cy=btn-logout]').click()
  })
})