# Mason Garza - Cypress Automation 

## Overview 
This project demonstrates my proficiency with [Cypress](https://docs.cypress.io/app/get-started/why-cypress) for modern web application automation testing, with a focus on building clean, maintainable, and production-quality test frameworks. The repository is structured to showcase subprojects using the most popular, supported languages under a shared design philosophy. Currently, only the TypeScript subproject is fully implemented.  

Each subproject is intentionally self-contained and mirrors real-world automation practices, including centralized logging, automated screenshot capture on failure, and HTML reporting using industry-standard tools. The goal is to showcase not only test coverage, but also framework design decisions, execution reliability, and debuggability.  

The test suite includes common and practical test case examples using [The Internet Herokuapp](https://the-internet.herokuapp.com/) as the test target. Covered scenarios include navigation and page validation, form authentication (success and failure cases), JavaScript alerts, checkboxes, dropdowns, dynamic controls, file uploads, frame handling, and intentional failure cases used to validate screenshot-on-failure and reporting behavior.  

Throughout the project, special care is taken to document challenges encountered and the solutions applied, reflecting the kinds of debugging and architectural decisions required in real QA automation work. This project is intended to be used as a reference for future, professional work.  

--- 

## Getting Started
(All commands must be run inside their respective subproject folders.)
### Clone the repository 
```bash
git clone https://github.com/MasonGarza7/cypress-tests.git
cd cypress-tests
```

### Install TypeScript dependencies:
1. CD the `typescript_basics/` subproject folder
2. Ensure Node.js and npm are installed (I used Node v24.11.0 and npm 11.6.1)
3. Install the required node packages by running: 
```bash
npm install
```

## Running Tests:

### Running all tests - HEADED:
1. TypeScript (CD the `typescript_basics/` folder)
```bash
npm run test:headed
```
### Running all tests - HEADLESS:
1. TypeScript (CD the `typescript_basics/` folder)
```bash
npm test
```

### Running a single test script - HEADED: 
1. TypeScript (CD the `typescript_basics/` folder)
```bash
npm run test:spec:headed -- --spec cypress/e2e/03_checkboxes.cy.ts
```

### Running a single test script - HEADLESS:
1. TypeScript (CD the `typescript_basics/` folder)
```bash
npm run test:spec -- --spec cypress/e2e/03_checkboxes.cy.ts
```


## File Structure: 
```bash
.
├── typescript_basics/                          # TypeScript subproject
│   ├── cypress/                                # Cypress test framework root
│   │   ├── e2e/                                # End-to-end Cypress test specs
│   │   ├── fixtures/                           # Static test data used by Cypress tests
│   │   │   └── example.json                    # Sample fixture file (default Cypress example)
│   │   │
│   │   └── support/                            # Cypress global configuration and custom commands
│   │       ├── commands.ts                     # Custom Cypress commands (logging helpers, reusable actions)
│   │       ├── e2e.ts                          # Global test hooks and setup (logging, reporter registration)
│   │       └── index.d.ts                      # TypeScript declarations for custom Cypress commands
│   │
│   ├── node_modules/                           # Installed Node.js dependencies (auto-generated)
│   │
│   ├── results/                                # Test run output artifacts (auto-generated)
│   │   ├── logs/                               # Timestamped log files for each test run
│   │   ├── reports/                            # Mochawesome JSON files and final HTML report
│   │   └── screenshots/                        # Screenshots automatically captured on test failures
│   │
│   ├── scripts/                                # Node.js helper scripts for automation and reporting
│   │   ├── clean-results.js                    # Cleans previous test artifacts before a new run
│   │   ├── generate-report.js                  # Merges Mochawesome JSON files and generates HTML report
│   │   ├── logger.js                           # Centralized Winston logger used by Cypress tasks
│   │   ├── run-and-report.js                   # Runs full test suite headless and always generates report
│   │   ├── run-and-report-headed.js            # Runs full test suite headed and always generates report
│   │   ├── run-spec-and-report-headed.js       # Runs a single spec headed and always generates report
│   │   └── test-spec.js                        # Runs a single spec headless and always generates report
│   │
│   ├── temp_files/                             # Temporary files created during tests (e.g., file upload)
│   │
│   ├── cypress.config.ts                       # Cypress configuration (reporter, screenshots, tasks, etc.)
│   ├── package.json                            # Project manifest defining scripts, dependencies, and commands
│   ├── package-lock.json                       # Lockfile ensuring consistent dependency versions
│   └── tsconfig.json                           # TypeScript compiler configuration
│
├── .gitignore                                  # Files and directories excluded from version control
└── README.md                                   # Project overview, setup, instructions, and documentation 
```


## Test Cases
| Tests | Purpose |
|-|-|
|Navigation|navigate and title validations|
|Form Authentication|success/failure with valid/invalid credentials|
|Checkboxes|toggling checkboxes on/off|
|Dropdown|making selections|
|Dynamic Controls|remove/add and Enable/Disable|
|Alerts|validate each JavaScript alert|
|Frames|frame switching and text validation|
|File Upload|create, upload, and delete temporary files|
|Intentional Failure|validate screenshot-on-failure|


## Logging and Reporting Results: 
TypeScript:
- Test reports are available in the `typescript_basics/results/reports/` folder. Drag and drop the `report.html` into your browser to see the standard Mochawesome report. 
- Logs are made using Winston and available in the `typescript_basics/results/logs/` folder as well as visible in the console. 


## Screenshot on Failure:
- When a TypeScript test fails, a screenshot is automatically captured using Cypress' built-in functionality. 
    - Screenshots can be viewed in `typescript_basics/results/screenshots/` with labeled folder/file names. 


## Blockers and Breakthroughs: 
When running tests, certain log messages (such as “STARTING TEST...”) appeared twice in the generated log files even though Cypress reported only a single spec and a single test execution with no retries configured. This behavior was traced to Cypress’s internal execution model, where test code may be evaluated more than once during a single run, meaning browser-side side effects like `cy.task()` logging can fire multiple times even though assertions and results are recorded once. The fix was to move responsibility for de-duplication to the Node layer by introducing a dedicated `logStart` task and guarding it with a Node-side set keyed by spec name and test title, ensuring that lifecycle messages are logged exactly once per test regardless of how many times Cypress evaluates the test code. After this change, the logs became clean and predictable, with one clear start entry per test and consistent behavior in both local runs and CI, making the framework more reliable and professional. 


## Next Steps:
- Begin the next subproject, which will likely be JavaScript