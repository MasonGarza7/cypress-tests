describe("Navigation & Page Title Validation", () => {
  it("should navigate to the Form Authentication page and verify header", () => {
    const testName = "Navigation & Page Title Validation";
    cy.logStart(testName);

    const url = "https://the-internet.herokuapp.com/";
    cy.task(
      "logOnce",
      { spec: Cypress.spec.relative, title: testName, message: `Navigating to ${url}` },
      { log: false }
    );
    cy.visit(url);

    cy.task("logLine", { message: "Locating 'Form Authentication' link" }, { log: false });
    cy.contains("a", "Form Authentication").should("be.visible");

    cy.task("logLine", { message: "Clicking 'Form Authentication' link" }, { log: false });
    cy.contains("a", "Form Authentication").click();

    cy.task("logLine", { message: "Validating header equals 'Login Page'" }, { log: false });
    cy.get("h2").should("have.text", "Login Page");

    cy.url().then((currentUrl) => {
      cy.task("logLine", { message: `Current URL: ${currentUrl}` }, { log: false });
      expect(currentUrl).to.include("/login");
    });

    cy.task("logEnd", { title: testName }, { log: false });
  });
});
