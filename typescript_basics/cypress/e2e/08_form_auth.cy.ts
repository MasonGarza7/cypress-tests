describe("Form Authentication", () => {
  const url = "https://the-internet.herokuapp.com/login";

  it("should fail to log in with invalid credentials", () => {
    cy.logStart("Failed Login");

    cy.task("logOnce", {
      key: `NAV:${Cypress.spec.relative}:${url}`,
      message: `Navigating to ${url}`
    });
    cy.visit(url);

    cy.task("log", "Entering invalid username");
    cy.get("#username").type("wronguser");

    cy.task("log", "Entering invalid password");
    cy.get("#password").type("wrongpassword", { log: false });

    cy.task("log", "Clicking Login button");
    cy.get("button[type='submit']").click();

    cy.task("log", "Waiting for failure message");
    cy.get("#flash")
      .should("be.visible")
      .invoke("text")
      .then((text) => {
        const msg = text.trim();
        expect(
          msg.includes("Your username is invalid!") || msg.includes("Your password is invalid!")
        ).to.eq(true);
      });

    cy.task("log", "ENDING Test --- Failed Login ---");
  });

  it("should successfully log in with valid credentials", () => {
    cy.logStart("Successful Login");

    cy.task("logOnce", {
      key: `NAV:${Cypress.spec.relative}:${url}:valid`,
      message: `Navigating to ${url}`
    });
    cy.visit(url);

    cy.task("log", "Entering username");
    cy.get("#username").type("tomsmith");

    cy.task("log", "Entering password");
    cy.get("#password").type("SuperSecretPassword!", { log: false });

    cy.task("log", "Clicking Login button");
    cy.get("button[type='submit']").click();

    cy.task("log", "Waiting for success message");
    cy.get("#flash")
      .should("be.visible")
      .should("contain.text", "You logged into a secure area!");

    cy.task("log", "ENDING Test --- Successful Login ---");
  });
});
