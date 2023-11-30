import { signInForm } from '../pages/signInPage'
import { signUpForm } from '../pages/signUpPage'
import { homePage } from '../pages/homePage'
import { profilePage } from '../pages/profilePage'

describe('Sign out', () => {
    beforeEach(() => {
        cy.fixture('deleteAccountTestData.json').as('account')
        cy.visit('/signup')
        cy.get('@account').then((account) => {
            signUpForm
                .inputName(account.name)
                .inputEmail(account.email)
                .inputPassword(account.password)
                .clickSubmit()
                .goToSignin()

            signInForm
                .inputEmail(account.email)
                .inputPassword(account.password)
                .clickSubmit()
        })
    });

    it('TC-SIGNPUT-1: Verify that the user cannot login with deleted acount.', () => {
        homePage
            .goToProfilePage()
        profilePage
            .deleteAccount()
        cy.visit('/signup')
        cy.get('@account').then((account) => {
            signInForm
                .goToSignin()
                .inputEmail(account.email)
                .inputPassword(account.password)
                .clickSubmit()
                .checkErrorMessage(account.message)
        })
    })
})