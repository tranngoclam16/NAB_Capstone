import {signInForm} from '../pages/signInPage'
import { homePage } from '../pages/homePage'

describe('Sign out', () => {
    beforeEach(() => {
        cy.fixture('account.json').as('account')
        cy.visit('/signin')
        cy.get('@account').then((account) => {
            signInForm
                .inputEmail(account.email)
                .inputPassword(account.password)
                .clickSubmit()
        })
    });

    it('TC-SIGNPUT-1: Verify that the user log out successfully after loggin in with a valid account', () => {
        homePage
            .clickSignOut()
            .checkLogoutSuccessfully()
    })
})