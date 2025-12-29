describe("Dynamic Controls", () => {
  it("should remove and add the checkbox and enable/disable input field", () => {
    const testName = "Dynamic Controls";
    cy.logStart(testName);

    const url = "https://the-internet.herokuapp.com/dynamic_controls";
    cy.task(
      "logOnce",
      { spec: Cypress.spec.relative, title: testName, message: `Navigating to ${url}` },
      { log: false }
    );
    cy.visit(url);

    // Remove / Add checkbox
    cy.task("logLine", { message: "Locating Remove button" }, { log: false });
    cy.contains("button", "Remove").should("be.visible");

    cy.task("logLine", { message: "Clicking Remove button" }, { log: false });
    cy.contains("button", "Remove").click();

    cy.task("logLine", { message: "Waiting for checkbox to be removed" }, { log: false });
    cy.get("#message").should("be.visible").and("contain.text", "gone");
    cy.get("#checkbox").should("not.exist");

    cy.task("logLine", { message: "Clicking Add button" }, { log: false });
    cy.contains("button", "Add").click();

    cy.task("logLine", { message: "Waiting for checkbox to return" }, { log: false });
    cy.get("#message").should("be.visible").and("contain.text", "back");
    cy.get("#checkbox").should("exist");

    // Enable / Disable input
    cy.task("logLine", { message: "Locating Enable button" }, { log: false });
    cy.contains("button", "Enable").should("be.visible");

    cy.task("logLine", { message: "Clicking Enable button" }, { log: false });
    cy.contains("button", "Enable").click();

    cy.task("logLine", { message: "Waiting for input to be enabled" }, { log: false });
    cy.get("#message").should("be.visible").and("have.text", "It's enabled!");
    cy.get("input[type='text']").should("be.enabled");

    cy.task("logLine", { message: "Locating Disable button" }, { log: false });
    cy.contains("button", "Disable").should("be.visible");

    cy.task("logLine", { message: "Clicking Disable button" }, { log: false });
    cy.contains("button", "Disable").click();

    cy.task("logLine", { message: "Waiting for input to be disabled" }, { log: false });
    cy.get("#message").should("be.visible").and("have.text", "It's disabled!");
    cy.get("input[type='text']").should("be.disabled");

    cy.task("logEnd", { title: testName }, { log: false });
  });
});
