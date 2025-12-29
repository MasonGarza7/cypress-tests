describe("Frames", () => {
  it("should switch between frames and verify frame content", () => {
    const testName = "Frames";
    cy.logStart(testName);

    const url = "https://the-internet.herokuapp.com/nested_frames";
    cy.task(
      "logOnce",
      { spec: Cypress.spec.relative, title: testName, message: `Navigating to ${url}` },
      { log: false }
    );
    cy.visit(url);

    //
    // TOP -> MIDDLE FRAME
    //
    cy.task("logLine", { message: "Switching to top frame" }, { log: false });
    cy.get("frame[name='frame-top']").should("exist");

    cy.task("logLine", { message: "Switching to middle frame" }, { log: false });
    cy.get("frame[name='frame-top']")
      .its("0.contentDocument.body")
      .should("not.be.empty")
      .within(() => {
        cy.get("frame[name='frame-middle']")
          .its("0.contentDocument.body")
          .should("not.be.empty")
          .within(() => {
            cy.task("logLine", { message: "Reading text inside middle frame" }, { log: false });
            cy.get("#content").should("have.text", "MIDDLE");
            cy.task("logLine", { message: "Text verified: MIDDLE" }, { log: false });
          });
      });

    //
    // BOTTOM FRAME
    //
    cy.task("logLine", { message: "Switching to bottom frame" }, { log: false });
    cy.get("frame[name='frame-bottom']")
      .its("0.contentDocument.body")
      .should("not.be.empty")
      .then((body) => {
        cy.task("logLine", { message: "Reading text inside bottom frame" }, { log: false });
        const text = body.innerText.trim();
        expect(text).to.eq("BOTTOM");
        cy.task("logLine", { message: "Text verified: BOTTOM" }, { log: false });
      });

    //
    // DONE
    //
    cy.task("logEnd", { title: testName }, { log: false });
  });
});
