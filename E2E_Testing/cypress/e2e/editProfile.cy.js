import { signInForm } from '../pages/signInPage'
import { profilePage } from '../pages/profilePage'
import { editProfileForm } from '../pages/editProfilePage'
import { homePage } from '../pages/homePage'

describe('Edit profile', () => {
  beforeEach(() => {
    cy.fixture('editProfileTestData.json').as('editprofile')
    cy.visit('/signin')
    cy.fixture("account").then((account) => {
      signInForm
        .inputEmail(account.email)
        .inputPassword(account.password)
        .clickSubmit()
      // .goToProfilePage()
    })
    homePage.goToProfilePage()
    profilePage
      .goToEditProfilePage()

  });

  it('TC-EDITPROFILE-1: Verify that the user cannot submit new profile with all empty Name, Email and Password', () => {
    cy.get('@editprofile').then((users) => {
      editProfileForm
        .clickSubmit()
        .checkErrorMessage(users[0].message)
    })
  })

  it('TC-EDITPROFILE-2: Verify that the user cannot submit new profile with invalid data (Name and Email are space character)', () => {
    cy.get('@editprofile').then((users) => {
      editProfileForm
        .inputName(users[1].name)
        .inputEmail(users[1].email)
        .inputPassword(users[1].password)
        .clickSubmit()
        .checkErrorMessage(users[1].message)
    })
  })

  const users = require('../fixtures/editProfileTestData.json')

  const invalidName = users[2].invalidName
  invalidName.forEach(invalid_name => {
    it('TC-EDITPROFILE-3: Verify that the user cannot submit new profile with invalid name: ' + JSON.stringify(invalid_name.name), () => {
      cy.get('@editprofile').then((users) => {
        editProfileForm
          .inputName(invalid_name.name)
          .inputEmail(users[2].email)
          .inputPassword(users[2].password)
          .clickSubmit()
          .checkErrorMessage(invalid_name.message)
      })
    })
  })

  const invalidEmail = users[3].invalidEmail
  invalidEmail.forEach(email => {
    it('TC-EDITPROFILE-4: Verify that the user cannot submit new profile with invalid email: ' + JSON.stringify(email), () => {
      cy.get('@editprofile').then((users) => {
        editProfileForm
          .inputName(users[3].name)
          .inputEmail(email)
          .inputPassword(users[3].password)
          .clickSubmit()
          .checkErrorMessage(users[3].message)
      })
    })
  })
  const invalidPassword = users[4].invalidPassword
  invalidPassword.forEach(invalid_password => {
    it('TC-EDITPROFILE-5: Verify that the user cannot submit new profile with invalid password: ' + JSON.stringify(invalid_password.password), () => {
      cy.get('@editprofile').then((users) => {
        editProfileForm
          .inputName(users[4].name)
          .inputEmail(users[4].email)
          .inputPassword(invalid_password.password)
          .clickSubmit()
          .checkErrorMessage(invalid_password.message)
      })
    })
  })
})