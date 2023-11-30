export const signUpForm = {
    TXT_NAME: 'input#name',
    TXT_EMAIL: 'input#email',
    TXT_PASSWORD: 'input#password',
    BTN: 'button',
    LBL_SUBMIT: 'Submit',
    LBL_SIGNIN: 'Sign In',
    DLG_NEWACCOUNT: '.MuiDialog-container p',
    TXT_ERRORMESSAGE: 'p.MuiTypography-root',
    inputName(name) {
        cy.get(this.TXT_NAME).clear().type(name, { force: true });
        return this;
    },
    inputEmail(email) {
        cy.get(this.TXT_EMAIL).clear().type(email, { force: true });
        return this;
    },
    inputPassword(password) {
        cy.get(this.TXT_PASSWORD).clear().type(password, { force: true });
        return this;
    },
    clickSubmit(){
        cy.get(this.BTN).contains(this.LBL_SUBMIT).click();
        return this
    },
    checkDialogMessage(message){
        cy.get(this.DLG_NEWACCOUNT).contains(message).should("be.visible");
        return this
    },
    checkErrorMessage(message){
        cy.get(this.TXT_ERRORMESSAGE).contains(message).should("be.visible");
        return this
    },
    goToSignin(){
        cy.get(this.BTN).contains(this.LBL_SIGNIN).click()
        return this
    }
}