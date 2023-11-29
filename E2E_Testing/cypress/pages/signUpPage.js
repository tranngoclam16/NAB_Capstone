export const signUpForm = {
    TXT_NAME: 'input#name',
    TXT_EMAIL: 'input#email',
    TXT_PASSWORD: 'input#password',
    BTN: 'button',
    LBL_SUBMIT: 'Submit',
    DLG_NEWACCOUNT: '.MuiDialog-container p',
    TXT_ERRORMESSAGE: 'p.MuiTypography-root',
    inputName(name) {
        cy.get(this.TXT_NAME).type(name, { force: true });
        return this;
    },
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
    checkDialogMessage(message){
        cy.get(this.DLG_NEWACCOUNT).contains(message).should("be.visible");
        return this
    },
    checkErrorMessage(message){
        cy.get(this.TXT_ERRORMESSAGE).contains(message).should("be.visible");
        return this
    }
}