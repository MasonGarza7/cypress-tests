Cypress.Commands.add("logStart", (testName) => {
  cy.task("logStart", {
    spec: Cypress.spec.relative,
    title: testName
  });
});
