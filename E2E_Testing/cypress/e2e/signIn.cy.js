import { signInForm } from '../pages/signInPage'
describe('Sign In', () => {
  beforeEach(() => {
    cy.fixture('signInTestData.json').as('signin')
    cy.visit('/signin')
  });
  it('TC_SIGNIN-1: Verify that the user log in successfully with a valid account', () => {
    cy.get('@signin').then((users) => {
      signInForm
        .inputEmail(users[0].email)
        .inputPassword(users[0].password)
        .clickSubmit()
        .checkLoginSuccessfully()
    })
  })

  it('TC_SIGNIN-2: Verify that the user cannot login with all empty Email and Password', () => {
    cy.get('@signin').then((users) => {
      signInForm
        .clickSubmit()
        .checkErrorMessage(users[1].message)
    })
  })

  it('TC_SIGNIN-3: Verify that the user cannot login with an invalid account (Email is invalid):', () => {
    cy.get('@signin').then((users) => {
      signInForm
        .inputEmail(users[2].email)
        .inputPassword(users[2].password)
        .clickSubmit()
        .checkErrorMessage(users[2].message)
    })
  })

  const users = require('../fixtures/signInTestData.json')

  const invalidPassword = users[3].invalidPassword
  invalidPassword.forEach(invalid_password => {
    it('TC_SIGNIN-4: Verify that the user cannot sign in with invalid password: ' + JSON.stringify(invalid_password.password), () => {
      cy.get('@signin').then((users) => {
        signInForm
          .inputEmail(users[3].email)
          .inputPassword(invalid_password.password)
          .clickSubmit()
          .checkErrorMessage(invalid_password.message)
      })
    })
  })
})