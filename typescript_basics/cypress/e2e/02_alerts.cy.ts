describe("JavaScript Alerts", () => {
  it("should handle and validate JS alert popups", () => {
    cy.logStart("JavaScript Alerts");

    const url = "https://the-internet.herokuapp.com/javascript_alerts";
    cy.task("logOnce", {
      key: `NAV:${Cypress.spec.relative}:${url}`,
      message: `Navigating to ${url}`
    });
    cy.visit(url);

    // === ALERT 1: Simple OK Alert ===
    cy.task("log", "Clicking JS Alert button");
    cy.window().then((win) => {
      const alertStub = cy.stub(win, "alert");
      cy.wrap(alertStub, { log: false }).as("jsAlert");
    });

    cy.contains("button", "Click for JS Alert").click();
    cy.get("@jsAlert").should("have.been.calledOnceWith", "I am a JS Alert");
    cy.get("#result").should("have.text", "You successfully clicked an alert");
    cy.task("log", "Alert 1 validated successfully");

    // === ALERT 2: Confirmation Alert (Cancel) ===
    cy.task("log", "Clicking JS Confirm button");
    cy.window().then((win) => {
      const confirmStub = cy.stub(win, "confirm").returns(false);
      cy.wrap(confirmStub, { log: false }).as("jsConfirm");
    });

    cy.contains("button", "Click for JS Confirm").click();
    cy.get("@jsConfirm").should("have.been.calledOnceWith", "I am a JS Confirm");
    cy.get("#result").should("have.text", "You clicked: Cancel");
    cy.task("log", "Alert 2 validated successfully");

    // === ALERT 3: Prompt Alert ===
    const promptText = "Cypress Test";
    cy.task("log", "Clicking JS Prompt button");
    cy.window().then((win) => {
      const promptStub = cy.stub(win, "prompt").returns(promptText);
      cy.wrap(promptStub, { log: false }).as("jsPrompt");
    });

    cy.contains("button", "Click for JS Prompt").click();
    cy.get("@jsPrompt").should("have.been.calledOnceWith", "I am a JS prompt");
    cy.get("#result").should("contain.text", promptText);
    cy.task("log", "Alert 3 validated successfully");

    cy.task("log", "ENDING Test --- Alerts ---");
  });
});
