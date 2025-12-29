declare namespace Cypress {
  interface Chainable {
    logStart(testName: string): Chainable<void>;
  }
}
