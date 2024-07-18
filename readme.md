# Cypress Refresh 2024

Re-learning cypress again with new enhanced cypress capabilities to refresh the concept.

## Project Overview

This project is a comprehensive Cypress-based automation framework designed for robust end-to-end testing, API testing, and accessibility testing. It incorporates various advanced features and reporting mechanisms to provide a powerful and flexible testing solution.

## Features

- End-to-End Testing
- API Testing
- Accessibility Testing
- Cucumber BDD Integration
- Allure Reporting
- Mochawesome Reporting
- Multi-browser Testing
- Parallel Test Execution
- Drag and Drop Testing
- Excel Data Handling

## Prerequisites

- Node.js (Latest LTS version recommended)
- npm (comes with Node.js)

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/kwishna/cypress-cucumber-api-ui.git
cd cypress-refresh-2024
npm install
```

For a complete list of available scripts, refer to the scripts section in package.json.
```bash
    npm run test: Open Cypress in Chrome browser
    npm run e2e: Run Cypress tests in headless mode
    npm run e2e:open: Open Cypress Test Runner
    npm run e2e:run: Run tests with specific tags in headless Chrome
    npm run e2e:chrome: Run tests in Chrome browser
    npm run e2e:record: Run tests and record results
    npm run e2e:record:parallel: Run tests in parallel and record results
    npm run allure-report: Generate and serve Allure report
    npm run generate-report: Generate Allure report
```

# Configuration
The project uses various configuration files:
- cypress.config.ts: Main Cypress configuration
- cypress.env.json: Environment variables (create this file locally)

# Writing Tests
Tests are written using Cypress with Cucumber for BDD. Place your feature files in the cypress/e2e/features directory and corresponding step definitions in cypress/e2e/stepDefs and corresponding pages for page object model.

```bash
npm run e2e:run
```

The project supports multiple reporting formats:

- Allure: npm run allure-report
- Mochawesome: Generated automatically after test runs

# Continuous Integration
The project is set up for CI/CD with scripts for running tests in different browsers and parallel execution.

# Contributing
Please read the CONTRIBUTING.md file (if available) for details on our code of conduct and the process for submitting pull requests.

# License
This project is licensed under the ISC License.

# Author
Krishna Kumar Singh