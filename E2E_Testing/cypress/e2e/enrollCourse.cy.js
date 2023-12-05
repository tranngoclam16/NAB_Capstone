describe("Enroll", () => {

  beforeEach(() => {
    const name = generateRandomName();
    cy.visit("/signup");
    cy.get("#name").clear().type(name, { force: true });
    cy.get("#email").type(name +"@gmail.com");
    cy.get("#password").type("@Bcd1234");
    cy.get('button').contains('Submit').click();
    cy.get('button').contains('Sign In').click();

    cy.get("#email").type(name +"@gmail.com");
    cy.get("#password").type("@Bcd1234");
    cy.get('button').contains('Submit').click();

  });

  it("TC-Enroll: Verify that the user enroll course", () => {
    cy.get('a').contains('Introduction to Machine Learning').click();
    cy.get('button').contains('Enroll').click();
  
  })

  it("TC-Markcomlete: Verify that the user can mark complete ", () => {
  cy.get('a').contains('Introduction to Machine Learning').click();
  cy.get('button').contains('Enroll').click();
   cy.get(".MuiListItem-container").contains('1').click();    
   cy.get('button').contains('Mark as complete').click();    
   cy.get('button').contains('Completed').should("be.visible");    
   cy.get('.MuiListItem-container').find('path').should('have.attr', 'd', 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'); // Kiểm tra cả nội dung path (dấu tick)
   //cy.get('.MuiListItem-container').find('svg').should('have.class', 'MuiSvgIcon-root').and('have.css', 'color', '#38cc38');// Kiểm tra class
   cy.get('button').contains('Sign out').click();
  });
});



function generateRandomName() {
  // Generate a random string of length 10
  const randomString = Math.random().toString(36).substring(2, 12);

  // Make sure the string only contains letters
  return randomString.replace(/[^a-z]/g, "");
}

