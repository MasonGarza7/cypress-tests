describe("Form Authentication", () => {
  const url = "https://the-internet.herokuapp.com/login";

  it("should fail to log in with invalid credentials", () => {
    const testName = "Failed Login";
    cy.logStart(testName);

    cy.task(
      "logOnce",
      { spec: Cypress.spec.relative, title: testName, message: `Navigating to ${url}` },
      { log: false }
    );
    cy.visit(url);

    cy.task("logLine", { message: "Entering invalid username" }, { log: false });
    cy.get("#username").type("wronguser");

    cy.task("logLine", { message: "Entering invalid password" }, { log: false });
    cy.get("#password").type("wrongpassword", { log: false });

    cy.task("logLine", { message: "Clicking Login button" }, { log: false });
    cy.get("button[type='submit']").click();

    cy.task("logLine", { message: "Waiting for failure message" }, { log: false });
    cy.get("#flash")
      .should("be.visible")
      .invoke("text")
      .then((text) => {
        const msg = text.trim();
        expect(
          msg.includes("Your username is invalid!") || msg.includes("Your password is invalid!")
        ).to.eq(true);
      });

    cy.task("logEnd", { title: testName }, { log: false });
  });

  it("should successfully log in with valid credentials", () => {
    const testName = "Successful Login";
    cy.logStart(testName);

    cy.task(
      "logOnce",
      { spec: Cypress.spec.relative, title: testName, message: `Navigating to ${url}` },
      { log: false }
    );
    cy.visit(url);

    cy.task("logLine", { message: "Entering username" }, { log: false });
    cy.get("#username").type("tomsmith");

    cy.task("logLine", { message: "Entering password" }, { log: false });
    cy.get("#password").type("SuperSecretPassword!", { log: false });

    cy.task("logLine", { message: "Clicking Login button" }, { log: false });
    cy.get("button[type='submit']").click();

    cy.task("logLine", { message: "Waiting for success message" }, { log: false });
    cy.get("#flash")
      .should("be.visible")
      .should("contain.text", "You logged into a secure area!");

    cy.task("logEnd", { title: testName }, { log: false });
  });
});
