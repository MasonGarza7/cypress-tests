describe("smoke", () => {
  it("passes", () => {
    cy.logStart("passes");

    cy.visit("https://example.cypress.io");
    cy.task("log", "Visited example page");

    cy.contains("type").click();
    cy.task("log", "Clicked 'type' link");
  });
});
