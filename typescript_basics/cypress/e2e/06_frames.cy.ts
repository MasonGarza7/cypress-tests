describe("Frames", () => {
  it("should switch between frames and verify frame content", () => {
    cy.logStart("Frames");

    const url = "https://the-internet.herokuapp.com/nested_frames";
    cy.task("logOnce", {
      key: `NAV:${Cypress.spec.relative}:${url}`,
      message: `Navigating to ${url}`
    });
    cy.visit(url);

    //
    // TOP → MIDDLE FRAME
    //
    cy.task("log", "Switching to top frame");
    cy.get("frame[name='frame-top']").should("exist");

    cy.task("log", "Switching to middle frame");
    cy.get("frame[name='frame-top']")
      .its("0.contentDocument.body").should("not.be.empty")
      .within(() => {
        cy.get("frame[name='frame-middle']")
          .its("0.contentDocument.body").should("not.be.empty")
          .within(() => {
            cy.task("log", "Reading text inside middle frame");
            cy.get("#content").should("have.text", "MIDDLE");
            cy.task("log", "Text verified: MIDDLE");
          });
      });

    //
    // BOTTOM FRAME
    //
    cy.task("log", "Switching to bottom frame");
    cy.get("frame[name='frame-bottom']")
    .its("0.contentDocument.body")
    .should("not.be.empty")
    .then((body) => {
        cy.task("log", "Reading text inside bottom frame");
        const text = (body as HTMLBodyElement).innerText.trim();
        expect(text).to.eq("BOTTOM");
        cy.task("log", "Text verified: BOTTOM");
    });

    //
    // DONE
    //
    cy.task("log", "ENDING Test --- Frames ---");
  });
});
