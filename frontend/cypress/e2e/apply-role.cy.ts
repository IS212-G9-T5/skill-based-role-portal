describe("Staff apply for role listing", () => {
  // Intercept the network request and alias it
  beforeEach(() => {
    cy.intercept("POST", "/api/login").as("loginRequest")
  })

  /* ==== Test Created with Cypress Studio ==== */
  it("apply-role", function () {
    cy.visit("http://localhost:5173")
    cy.get(".space-y-6 > :nth-child(1)").click()
    cy.get("#staffId").type("140002")
    cy.get(":nth-child(3) > .flex").click()
    cy.get(
      '[href="/role-listing/90"] > :nth-child(1) > .rounded-lg > .pl-\\[5\\%\\] > .MuiTypography-body1'
    ).click()
    cy.get(".MuiButton-containedSuccess").click()
    cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click()
    cy.get(".MuiButton-containedError").click()
    cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click()
    cy.get(".MuiButton-containedInfo").click()
    cy.get(":nth-child(3) > .text-lg").click()
  })

  // it("Visits the desired URL", () => {
  //   cy.visit("http://localhost:5173/");

  //   cy.get("#staffId").type("140002");
  //   cy.get('button[type="submit"]').click();

  //   cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);

  //   cy.window().then((window) => {
  //     window.localStorage.setItem("role", "Staff");
  //   });

  //   cy.url().should("include", "/all-role-listing");

  // });
})
