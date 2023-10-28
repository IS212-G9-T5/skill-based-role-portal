
describe('Staff apply for role listing', () => {
  it('Visits the desired URL', () => {
    // Visit the initial URL
    cy.visit('http://localhost:5173/');

    // Enter staff ID and password and submit the form
    cy.get('#staffId').type('140002');
    cy.get('button[type="submit"]').click();

    // cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);
    cy.url().should('include', '/all-role-listing?page=1&size=10');

  });
});
