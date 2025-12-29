describe("Dynamic Controls", () => {
  it("should remove and add the checkbox and enable/disable input field", () => {
    cy.logStart("Dynamic Controls");

    const url = "https://the-internet.herokuapp.com/dynamic_controls";
    cy.task("logOnce", {
      key: `NAV:${Cypress.spec.relative}:${url}`,
      message: `Navigating to ${url}`
    });
    cy.visit(url);

    // --- Remove / Add checkbox ---
    cy.task("log", "Locating Remove button");
    cy.contains("button", "Remove").should("be.visible");

    cy.task("log", "Clicking Remove button");
    cy.contains("button", "Remove").click();

    cy.task("log", "Waiting for checkbox to be removed");
    cy.get("#message").should("be.visible").and("contain.text", "gone");
    cy.get("#checkbox").should("not.exist");

    cy.task("log", "Clicking Add button");
    cy.contains("button", "Add").click();

    cy.task("log", "Waiting for checkbox to return");
    cy.get("#message").should("be.visible").and("contain.text", "back");
    cy.get("#checkbox").should("exist");

    // --- Enable / Disable input ---
    cy.task("log", "Locating Enable button");
    cy.contains("button", "Enable").should("be.visible");

    cy.task("log", "Clicking Enable button");
    cy.contains("button", "Enable").click();

    cy.task("log", "Waiting for input to be enabled");
    cy.get("#message").should("be.visible").and("have.text", "It's enabled!");
    cy.get("input[type='text']").should("be.enabled");

    cy.task("log", "Locating Disable button");
    cy.contains("button", "Disable").should("be.visible");

    cy.task("log", "Clicking Disable button");
    cy.contains("button", "Disable").click();

    cy.task("log", "Waiting for input to be disabled");
    cy.get("#message").should("be.visible").and("have.text", "It's disabled!");
    cy.get("input[type='text']").should("be.disabled");

    cy.task("log", "ENDING Test --- Dynamic Controls ---");
  });
});
