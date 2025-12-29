# Mason Garza - Cypress Automation 

## Overview 
This project demonstrates my proficiency with [Cypress](https://docs.cypress.io/app/get-started/why-cypress) for modern web application automation testing, with a focus on building clean, maintainable, and production-quality test frameworks. The repository is structured to showcase two subprojects, one for each of the two natively supported languages under a shared design philosophy. Those languages are TypeScript and JavaScript.  

Each subproject is intentionally self-contained and mirrors real-world automation practices, including centralized logging, automated screenshot capture on failure, and HTML reporting using industry-standard tools. The goal is to showcase not only test coverage, but also framework design decisions, execution reliability, and debuggability.  

The test suite includes common and practical test case examples using [The Internet Herokuapp](https://the-internet.herokuapp.com/) as the test target. Covered scenarios include navigation and page validation, form authentication (success and failure cases), JavaScript alerts, checkboxes, dropdowns, dynamic controls, file uploads, frame handling, and intentional failure cases used to validate screenshot-on-failure and reporting behavior.  

Throughout the project, special care is taken to document challenges encountered and the solutions applied, reflecting the kinds of debugging and architectural decisions required in real QA automation work. This project is intended to be used as a reference for future, professional work.  

--- 

## Getting Started
All commands must be run inside their respective subproject folders. 

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

### Install JavaScript dependencies: 
1. CD the `javascript_basics/` subproject folder 
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
2. JavaScript (CD the `javascript_basics/` folder)
```bash
npm run test:headed
```

### Running all tests - HEADLESS:
1. TypeScript (CD the `typescript_basics/` folder)
```bash
npm test
```
2. JavaScript (CD the `javascript_basics/` folder)
```bash
npm run test
```

### Running a single test script - HEADED: 
1. TypeScript (CD the `typescript_basics/` folder)
```bash
npm run test:spec:headed -- --spec cypress/e2e/01_navigation.cy.ts
```
2. JavaScript (CD the `javascript_basics/` folder)
```bash
npm run test:spec:headed -- cypress/e2e/01_navigation.cy.js
```

### Running a single test script - HEADLESS:
1. TypeScript (CD the `typescript_basics/` folder)
```bash
npm run test:spec -- --spec cypress/e2e/01_navigation.cy.ts
```
2. JavaScript (CD the `javascript_basics/` folder)
```bash
npm run test:spec -- cypress/e2e/01_navigation.cy.js
```


## File Structure: 
```bash
.
├── javascript_basics/                          # JavaScript subproject
│   ├── cypress/                                # Cypress test framework root
│   │   ├── e2e/                                # End-to-end Cypress JavaScript test specs
│   │   └── support/                            # Cypress global configuration and custom commands
│   │       ├── utils/                          # Shared utility scripts used by all test specs 
│   │       │   └── logger.js                   # Cypress-side logging helpers (delegates to Node tasks)
│   │       ├── commands.js                     # Custom Cypress commands (e.g., logStart)
│   │       └── e2e.js                          # Global test hooks and setup logic
│   │
│   ├── node_modules/                           # Installed Node.js dependencies (auto-generated)
│   │
│   ├── results/                                # Test run output artifacts (auto-generated)
│   │   ├── logs/                               # Timestamped log files for each test run
│   │   ├── reports/                            # Mochawesome JSON files and final HTML report
│   │   ├── screenshots/                        # Screenshots automatically captured on test failures
│   │   └── videos/                             # Cypress test run videos
│   │
│   ├── scripts/                                # Node.js helper scripts for automation and reporting
│   │   ├── clean-results.js                    # Cleans previous report artifacts before a new run
│   │   ├── generate-report.js                  # Merges Mochawesome JSON files and generates HTML report
│   │   ├── logger.js                           # Centralized Winston logger used by Cypress Node tasks
│   │   ├── purge-results.js                    # Removes all generated test artifacts
│   │   ├── run-and-report.js                   # Runs full test suite headless and always generates report
│   │   ├── run-and-report-headed.js            # Runs full test suite headed and always generates report
│   │   ├── run-spec-and-report-headed.js       # Runs a single spec headed and always generates report
│   │   └── test-spec.js                        # Runs a single spec headless and always generates report
│   │
│   ├── temp_files/                             # Temporary files created during tests (e.g., file upload)
│   │
│   ├── cypress.config.js                       # Cypress configuration (reporter, tasks, screenshots, videos)
│   ├── package.json                            # Project manifest defining scripts and dependencies
│   └── package-lock.json                       # Lockfile ensuring consistent dependency versions
│
├── typescript_basics/                          # TypeScript subproject
│   ├── cypress/                                # Cypress test framework root
│   │   ├── e2e/                                # End-to-end Cypress TypeScript test specs
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
JavaScript: 
- Test reports are available in the `javascript_basics/results/reports/` folder. Drag and drop the `report.html` into your browser to see the standard Mochawesome report. 
- Logs are made using Winston and available in the `javascript_basics/results/logs/` folder as well as visible in the console. 


## Screenshot on Failure:
When a TypeScript test fails, a screenshot is automatically captured using Cypress' built-in functionality. 
- Screenshots can be viewed in `typescript_basics/results/screenshots/` with labeled folder/file names. 
When a JavaScript test fails, a screenshot is automatically captured using Cypress' built-in functionality. 
- Screenshots can be viewed in `javascript_basics/results/screenshots/` with labeled folder/file names. 



## Blockers and Breakthroughs: 
When running tests, certain log messages (such as “STARTING TEST...”) appeared twice in the generated log files even though Cypress reported only a single spec and a single test execution with no retries configured. This behavior was traced to Cypress’s internal execution model, where test code may be evaluated more than once during a single run, meaning browser-side side effects like `cy.task()` logging can fire multiple times even though assertions and results are recorded once. The fix was to move responsibility for de-duplication to the Node layer by introducing a dedicated `logStart` task and guarding it with a Node-side set keyed by spec name and test title, ensuring that lifecycle messages are logged exactly once per test regardless of how many times Cypress evaluates the test code. After this change, the logs became clean and predictable, with one clear start entry per test and consistent behavior in both local runs and CI, making the framework more reliable and professional. 


## Final Thoughts: 
This project was fun and challenging!  

A week ago, I had no experience with Cypress. Now I believe I would be more comfortable being handed a professional project or creating a new one.  

After working with Playwright and Selenium, Cypress strikes me as the most comprehensive and customizable solution for automated web testing. The desktop Cypress App that you can launch with command line makes for much more interesting debugging. And I haven't even touched the Cloud, UI Coverage, or Accessibility products yet. But I will say, with how customizable and scalable this Cypress and this project is, it was the most difficult to set up compared to Playwright and Selenium. But I, of course, imagine it would get easier if one used it everyday, constantly learning. And I agree with the internet consensus that Cypress is best suited for front end-developers or QA engineers working within the JavaScript ecosystem. 

In conclusion, I am very proud of this project and I will definitely be using it throughout my career as a cheatsheet and I welcome others to copy my homework!  

Thank you for reading,  
Mason Garza 