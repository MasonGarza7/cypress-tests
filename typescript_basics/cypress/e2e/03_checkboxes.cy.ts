describe("Checkboxes", () => {
  it("should correctly toggle and validate checkboxes", () => {
    cy.logStart("Checkboxes");

    // Step 1: Navigate to page
    const url = "https://the-internet.herokuapp.com/checkboxes";
    cy.task("logOnce", {
      key: `NAV:${Cypress.spec.relative}:${url}`,
      message: `Navigating to ${url}`
    });
    cy.visit(url);

    // Step 2: Locate both checkboxes
    cy.task("log", "Locating checkboxes");
    cy.get("#checkboxes input").should("have.length", 2);

    cy.get("#checkboxes input").then(($boxes) => {
      const checkbox1 = $boxes.eq(0);
      const checkbox2 = $boxes.eq(1);

      // Step 3: Validate default states
      cy.wrap(checkbox1).then(($cb1) => {
        cy.wrap(checkbox2).then(($cb2) => {
          const cb1Checked = ($cb1[0] as HTMLInputElement).checked;
          const cb2Checked = ($cb2[0] as HTMLInputElement).checked;

          cy.task(
            "log",
            `Initial State -> Checkbox 1: ${cb1Checked}, Checkbox 2: ${cb2Checked}`
          );
        });
      });

      // Step 4: Toggle checkbox 1 (should become checked)
      cy.task("log", "Clicking Checkbox 1");
      cy.wrap(checkbox1).click().should("be.checked");

      // Step 5: Toggle checkbox 2 (should become unchecked)
      cy.task("log", "Clicking Checkbox 2");
      cy.wrap(checkbox2).click().should("not.be.checked");
    });

    cy.task("log", "ENDING Test --- Checkboxes ---");
  });
});
