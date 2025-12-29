describe("Navigation & Page Title Validation", () => {
  it("should navigate to the Form Authentication page and verify header", () => {
    cy.logStart("Navigation & Page Title Validation");

    const url = "https://the-internet.herokuapp.com/";
    cy.task("logOnce", {
      key: `NAV:${Cypress.spec.relative}:${url}`,
      message: `Navigating to ${url}`
    });
    cy.visit(url);

    cy.task("log", "Locating 'Form Authentication' link");
    cy.contains("a", "Form Authentication")
      .should("be.visible");

    cy.task("log", "Clicking 'Form Authentication' link");
    cy.contains("a", "Form Authentication").click();

    cy.task("log", "Validating header equals 'Login Page'");
    cy.get("h2").should("have.text", "Login Page");

    cy.url().then((currentUrl) => {
      cy.task("log", `Current URL: ${currentUrl}`);
      expect(currentUrl).to.include("/login");
    });

    cy.task("log", "ENDING TEST --- Navigation & Page Title Validation ---");
  });
});
