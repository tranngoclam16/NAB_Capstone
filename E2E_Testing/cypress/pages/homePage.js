export const homePage = {
    BTN: 'button',
    LBL_SUBMIT: 'Submit',
    LBL_SIGNIN: 'Sign in',
    LBL_SIGNOUT: 'Sign out',
    LBL_MYPROFILE: 'My Profile',
    TXT_ERRORMESSAGE: 'p.MuiTypography-root',
    checkLogoutSuccessfully(){
        cy.get(this.BTN).contains(this.LBL_SIGNIN).should("be.visible");
        cy.get(this.BTN).contains(this.LBL_SIGNOUT).should("be.visible");
        return this
    },

    goToProfilePage(){
        cy.get(this.BTN).contains(this.LBL_MYPROFILE).click();
        return this
    }
}