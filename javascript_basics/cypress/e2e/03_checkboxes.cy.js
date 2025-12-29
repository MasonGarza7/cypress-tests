describe("Checkboxes", () => {
  it("should correctly toggle and validate checkboxes", () => {
    const testName = "Checkboxes";
    cy.logStart(testName);

    // Navigate to page
    const url = "https://the-internet.herokuapp.com/checkboxes";
    cy.task(
      "logOnce",
      { spec: Cypress.spec.relative, title: testName, message: `Navigating to ${url}` },
      { log: false }
    );
    cy.visit(url);

    // Locate both checkboxes
    cy.task("logLine", { message: "Locating checkboxes" }, { log: false });
    cy.get("#checkboxes input").should("have.length", 2);

    cy.get("#checkboxes input").then(($boxes) => {
      const checkbox1 = $boxes.eq(0);
      const checkbox2 = $boxes.eq(1);

      // Step 3: Validate default states
      const cb1Checked = checkbox1[0].checked;
      const cb2Checked = checkbox2[0].checked;

      cy.task(
        "logLine",
        { message: `Initial State -> Checkbox 1: ${cb1Checked}, Checkbox 2: ${cb2Checked}` },
        { log: false }
      );

      // Toggle checkbox 1 (should become checked)
      cy.task("logLine", { message: "Clicking Checkbox 1" }, { log: false });
      cy.wrap(checkbox1).click().should("be.checked");

      // Toggle checkbox 2 (should become unchecked)
      cy.task("logLine", { message: "Clicking Checkbox 2" }, { log: false });
      cy.wrap(checkbox2).click().should("not.be.checked");
    });

    cy.task("logEnd", { title: testName }, { log: false });
  });
});
