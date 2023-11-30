export const homePage = {
    BTN: 'button',
    LBL_SIGNUP: 'Sign up',
    LBL_SIGNIN: 'Sign In',
    LBL_SIGNOUT: 'Sign out',
    LBL_MYPROFILE: 'My Profile',
    TXT_ERRORMESSAGE: 'p.MuiTypography-root',
    clickSignOut(){
        cy.get(this.BTN).contains(this.LBL_SIGNOUT).click();
        return this
    },
    checkLogoutSuccessfully(){
        cy.get(this.BTN).contains(this.LBL_SIGNIN).should("be.visible");
        cy.get(this.BTN).contains(this.LBL_SIGNUP).should("be.visible");
        return this
    },

    goToProfilePage(){
        cy.get(this.BTN).contains(this.LBL_MYPROFILE).click();
        return this
    }
}