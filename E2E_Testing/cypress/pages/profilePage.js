export const profilePage = {
    BTN: 'button',
    LBL_EDITPROFILE: '[aria-label="Edit"]',
    goToEditProfilePage() {
        cy.get(this.LBL_EDITPROFILE).click();
        return this
    }
}