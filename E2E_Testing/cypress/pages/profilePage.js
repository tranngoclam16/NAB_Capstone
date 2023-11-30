export const profilePage = {
    BTN: 'button',
    LBL_EDITPROFILE: '[aria-label="Edit"]',
    LBL_DELETEPROFILE: '[aria-label="Delete"]',
    DLG_DELTE: '.MuiDialog-container p',
    LBL_CONFIRM: 'Confirm',
    goToEditProfilePage() {
        cy.get(this.LBL_EDITPROFILE).click();
        return this
    },
    deleteAccount(){
        cy.get(this.LBL_DELETEPROFILE).click();
        cy.get(this.BTN).contains(this.LBL_CONFIRM).click()
        return this
    }
}