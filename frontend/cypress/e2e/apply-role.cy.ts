describe("Staff apply for role listing", () => {
  // Intercept the network request and alias it
  beforeEach(() => {
    cy.intercept('POST', '/api/login').as('loginRequest');
  });

  it("Visits the desired URL", () => {
    cy.visit("http://localhost:5173/");

    cy.get("#staffId").type("140002");
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);
    
    cy.window().then((window) => {
      window.localStorage.setItem("userRole", "admin");
    });

    cy.url().should("include", "/all-role-listing");
  });
});