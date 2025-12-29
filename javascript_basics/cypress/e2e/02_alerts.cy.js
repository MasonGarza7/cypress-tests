describe("JavaScript Alerts", () => {
  it("should handle and validate JS alert popups", () => {
    const testName = "JavaScript Alerts";
    cy.logStart(testName);

    const url = "https://the-internet.herokuapp.com/javascript_alerts";
    cy.task(
      "logOnce",
      { spec: Cypress.spec.relative, title: testName, message: `Navigating to ${url}` },
      { log: false }
    );
    cy.visit(url);

    // ALERT 1: Simple OK Alert
    cy.task("logLine", { message: "Clicking JS Alert button" }, { log: false });
    cy.window().then((win) => {
      const alertStub = cy.stub(win, "alert");
      cy.wrap(alertStub, { log: false }).as("jsAlert");
    });

    cy.contains("button", "Click for JS Alert").click();
    cy.get("@jsAlert").should("have.been.calledOnceWith", "I am a JS Alert");
    cy.get("#result").should("have.text", "You successfully clicked an alert");
    cy.task("logLine", { message: "Alert 1 validated successfully" }, { log: false });

    // ALERT 2: Confirmation Alert (Cancel)
    cy.task("logLine", { message: "Clicking JS Confirm button" }, { log: false });
    cy.window().then((win) => {
      const confirmStub = cy.stub(win, "confirm").returns(false);
      cy.wrap(confirmStub, { log: false }).as("jsConfirm");
    });

    cy.contains("button", "Click for JS Confirm").click();
    cy.get("@jsConfirm").should("have.been.calledOnceWith", "I am a JS Confirm");
    cy.get("#result").should("have.text", "You clicked: Cancel");
    cy.task("logLine", { message: "Alert 2 validated successfully" }, { log: false });

    // ALERT 3: Prompt Alert
    const promptText = "Cypress Test";
    cy.task("logLine", { message: "Clicking JS Prompt button" }, { log: false });
    cy.window().then((win) => {
      const promptStub = cy.stub(win, "prompt").returns(promptText);
      cy.wrap(promptStub, { log: false }).as("jsPrompt");
    });

    cy.contains("button", "Click for JS Prompt").click();
    cy.get("@jsPrompt").should("have.been.calledOnceWith", "I am a JS prompt");
    cy.get("#result").should("contain.text", promptText);
    cy.task("logLine", { message: "Alert 3 validated successfully" }, { log: false });

    cy.task("logEnd", { title: testName }, { log: false });
  });
});
