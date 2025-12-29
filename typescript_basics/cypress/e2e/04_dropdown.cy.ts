describe("Dropdown", () => {
  it("should select options from the dropdown and verify selections", () => {
    cy.logStart("Dropdown");

    // Step 1: Navigate to Dropdown page
    const url = "https://the-internet.herokuapp.com/dropdown";
    cy.task("logOnce", {
      key: `NAV:${Cypress.spec.relative}:${url}`,
      message: `Navigating to ${url}`
    });
    cy.visit(url);

    // Step 2: Locate the dropdown element
    cy.task("log", "Locating dropdown element");
    cy.get("#dropdown").should("be.visible");

    // Step 3: Select Option 1
    cy.task("log", "Selecting Option 1");
    cy.get("#dropdown")
      .select("Option 1")
      .should("have.value", "1");

    cy.get("#dropdown option:selected")
      .should("have.text", "Option 1");

    cy.task("log", "Selected option: Option 1");

    // Step 4: Select Option 2
    cy.task("log", "Selecting Option 2");
    cy.get("#dropdown")
      .select("Option 2")
      .should("have.value", "2");

    cy.get("#dropdown option:selected")
      .should("have.text", "Option 2");

    cy.task("log", "Selected option: Option 2");

    cy.task("log", "ENDING Test --- Dropdown ---");
  });
});
