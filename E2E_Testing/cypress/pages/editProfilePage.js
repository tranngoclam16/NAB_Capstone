export const editProfileForm = {
    TXT_NAME: 'input#name',
    TXT_EMAIL: 'input#email',
    TXT_PASSWORD: 'input#password',
    BTN: 'button',
    LBL_SUBMIT: 'Submit',
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
    checkErrorMessage(message){
        cy.get(this.TXT_ERRORMESSAGE).contains(message).should("be.visible");
        return this
    }
}