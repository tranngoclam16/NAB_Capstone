export const signInForm = {
    TXT_EMAIL: 'input#email',
    TXT_PASSWORD: 'input#password',
    BTN: 'button',
    LBL_SUBMIT: 'Submit',
    LBL_MYPROFILE: 'My Profile',
    LBL_SIGNOUT: 'Sign out',
    TXT_ERRORMESSAGE: 'p.MuiTypography-root',
    inputEmail(email) {
        cy.get(this.TXT_EMAIL).type(email, { force: true });
        return this;
    },
    inputPassword(password) {
        cy.get(this.TXT_PASSWORD).type(password, { force: true });
        return this;
    },
    clickSubmit(){
        cy.get(this.BTN).contains(this.LBL_SUBMIT).click();
        return this
    },
    checkLoginSuccessfully(){
        cy.get(this.BTN).contains(this.LBL_MYPROFILE).should("be.visible");
        cy.get(this.BTN).contains(this.LBL_SIGNOUT).should("be.visible");
        return this
    },
    checkErrorMessage(message){
        cy.get(this.TXT_ERRORMESSAGE).contains(message).should("be.visible");
        return this
    },
    goToProfilePage(){
        cy.get(this.BTN).contains(this.LBL_MYPROFILE).click();
        return this
    }
}