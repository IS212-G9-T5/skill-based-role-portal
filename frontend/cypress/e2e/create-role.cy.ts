describe("Staff apply for role listing", () => {
  beforeEach(() => {
    cy.intercept("POST", "/api/login").as("loginRequest")
  })

  // Test to login
  it("Visits the desired URL and logs in", () => {
    cy.visit("http://localhost:5173/")

    cy.get("#staffId").type("160008")
    cy.get('button[type="submit"]').click()

    cy.wait("@loginRequest").its("response.statusCode").should("eq", 200)

    cy.window().then((window) => {
      window.localStorage.setItem("role", "Staff")
    })

    cy.url().should("include", "/view-applications")
  })

  // Test to create a role
  it("create-role", function () {
    // Assuming the login is required before creating a role
    cy.visit("http://localhost:5173")

    cy.get(".space-y-6 > :nth-child(1)").click()

    cy.get("#staffId").type("160008")
    cy.get(":nth-child(3) > .flex").click()

    cy.get('.MuiStack-root.css-1875w52-MuiStack-root > button.MuiButtonBase-root').eq(0).click();

    cy.url().should("include", "/create-role-listing")
  })
})
