describe("Dropdown", () => {
  it("should select options from the dropdown and verify selections", () => {
    const testName = "Dropdown";
    cy.logStart(testName);

    // Navigate to Dropdown page
    const url = "https://the-internet.herokuapp.com/dropdown";
    cy.task(
      "logOnce",
      { spec: Cypress.spec.relative, title: testName, message: `Navigating to ${url}` },
      { log: false }
    );
    cy.visit(url);

    // Locate the dropdown element
    cy.task("logLine", { message: "Locating dropdown element" }, { log: false });
    cy.get("#dropdown").should("be.visible");

    // Select Option 1
    cy.task("logLine", { message: "Selecting Option 1" }, { log: false });
    cy.get("#dropdown")
      .select("Option 1")
      .should("have.value", "1");

    cy.get("#dropdown option:selected")
      .should("have.text", "Option 1");

    cy.task("logLine", { message: "Selected option: Option 1" }, { log: false });

    // Select Option 2
    cy.task("logLine", { message: "Selecting Option 2" }, { log: false });
    cy.get("#dropdown")
      .select("Option 2")
      .should("have.value", "2");

    cy.get("#dropdown option:selected")
      .should("have.text", "Option 2");

    cy.task("logLine", { message: "Selected option: Option 2" }, { log: false });

    cy.task("logEnd", { title: testName }, { log: false });
  });
});
