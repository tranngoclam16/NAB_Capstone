import { signUpForm } from '../pages/signUpPage'
describe('Sign Up', () => {
  beforeEach(() => {
    cy.fixture('signUpTestData.json').as('signup')
    cy.visit('/signup')
  });
  it('TC-SIGNUP-1: Verify that the user submit successfully with valid data', () => {
    cy.get('@signup').then((users) => {
      signUpForm
        .inputName(users[0].name)
        .inputEmail(users[0].email)
        .inputPassword(users[0].password)
        .clickSubmit()
        .checkDialogMessage(users[0].message)
    })
  })

  it('TC-SIGNUP-2: Verify that the user cannot sign up with all empty Name, Email and Password', () => {
    cy.get('@signup').then((users) => {
      signUpForm
        .clickSubmit()
        .checkErrorMessage(users[1].message)
    })
  })

  it('TC-SIGNUP-3: Verify that the user cannot sign up with invalid data (Name and Email are space character)', () => {
    cy.get('@signup').then((users) => {
      signUpForm
        .inputName(users[2].name)
        .inputEmail(users[2].email)
        .inputPassword(users[2].password)
        .clickSubmit()
        .checkErrorMessage(users[2].message)
    })
  })

  const users = require('../fixtures/signUpTestData.json')

  const invalidName = users[3].invalidName
  invalidName.forEach(invalid_name => {
    it('TC-SIGNUP-4: Verify that the user cannot sign up with invalid name: ' + JSON.stringify(invalid_name.name), () => {
      cy.get('@signup').then((users) => {
        signUpForm
          .inputName(invalid_name.name)
          .inputEmail(users[3].email)
          .inputPassword(users[3].password)
          .clickSubmit()
          .checkErrorMessage(invalid_name.message)
      })
    })
  })

  const invalidEmail = users[4].invalidEmail
  invalidEmail.forEach(email => {
    it('TC-SIGNUP-4: Verify that the user cannot sign up with invalid email: ' + JSON.stringify(email), () => {
      cy.get('@signup').then((users) => {
        signUpForm
          .inputName(users[4].name)
          .inputEmail(email)
          .inputPassword(users[4].password)
          .clickSubmit()
          .checkErrorMessage(users[4].message)
      })
    })
  })
  const invalidPassword = users[5].invalidPassword
  invalidPassword.forEach(invalid_password => {
    it('TC-SIGNUP-5: Verify that the user cannot sign up with invalid password: ' + JSON.stringify(invalid_password.password), () => {
      cy.get('@signup').then((users) => {
        signUpForm
          .inputName(users[5].name)
          .inputEmail(users[5].email)
          .inputPassword(invalid_password.password)
          .clickSubmit()
          .checkErrorMessage(invalid_password.message)
      })
    })
  })
})