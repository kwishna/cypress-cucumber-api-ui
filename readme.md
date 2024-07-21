# Practice Test - Cypress (v13.13) - Testing tool for modern application

Learning cypress again with new enhanced cypress capabilities to refresh the concept.

## Project Overview

This project is a comprehensive Cypress-based automation framework designed for robust end-to-end testing, API testing, and accessibility testing. It incorporates various advanced features and reporting mechanisms to provide a powerful and flexible testing solution.

## Features

#### Test capabilities
    - UI Testing
    - API Testing
    - Accessibility Testing

#### Reporting capabilities
    - Allure Reporting
    - Mochawesome Reporting
    - Cucumber Reporting

#### Assertions capabilities
    - chaijs (should, expect)

#### Test Runner
    - Cucumber BDD
    - Mocha (cypress in-built)

#### Others
    - Multi-browser testing
    - Parallel test execution
    - Data-driven testing

#### Misc
    - Drag and Drop Testing
    - Iframe handling
    - Hover capabilities
    - Shadow root handling
    - JQuery API support
    - Stub, Spy, Mock - [here](https://example.cypress.io/commands/spies-stubs-clocks)
    - Intercept routes
    - WebSocket protocol
    - Chrome Devtools
    - Event handling
    - Excel Data Handling
    - Testing-library integeration
    - cypress-wait-until
    - cypress-recurse
    - json schema validation (ajv)
    - parse using jsonpath-plus
    - xml parse using xml2js
    - xml reading using exceljs
    - Failure retry
    - Video recording
    - Execution step snapshots
    - Soft assertions

#### Limitations
    - No support for multi-tab/window handling
    - Limited parallel execution capability
    - Major incompatibility issues within multiple 3rd party libraries
    - Debugging challenges
    - Heavy-weight (Performance overhead)
    - Limited integration with external APIs/libraries
    - Over-relying on 3rd party libraries for core functionalities
    - Not beginner friendly. Require intermediate/advance level of understanding in JavaScript/Typescript
    - Requires deep understanding of Promise, Callback chaining

## Prerequisites

- Node.js (Latest LTS version recommended)
- npm (comes with Node.js)

## Installation

Clone the repository and install dependencies:

```bash
    git clone https://github.com/kwishna/cypress-cucumber-api-ui.git
    cd cypress-cucumber-api-ui
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
Tests are written using Cypress with Cucumber for BDD.
Place your feature files in the `cypress/e2e/features` directory and corresponding step definitions in `cypress/e2e/stepDefs` and pages in `cypress/e2e/pages` for page object model. Place test data files in `cypress/fixtures` folder.

```bash
    npm run e2e:run
```

The project supports multiple reporting formats:

- Allure: npm run allure-report
- Mochawesome: Generated automatically after test runs
- Cucumber HTML, JSON reports

# Continuous Integration
The project can be set up for CI/CD with scripts for running tests in different browsers and parallel execution.
Integeration with `Azure DevOps`, `Jenkins` support (`azure-pipeline.yaml` and `Jenkinsfile` file will be added soon).
Integeration with `Docker` support (`Dockerfile` and `docker-compose.yaml` file be added soon.)

# Long term future Plans (Based on availability)
    - GraphQL testing
    - SQL based DB testing
    - Kafka event streaming for real time execution status reporting
    - Cypress plugin development
    - Integration with GenAI (Using locally hosted `Ollama` or `OpenAI`)

# Contributing
Please read the CONTRIBUTING.md file for details on our code of conduct and the process for submitting pull requests.

# License
This project is Open to use. Feel free use it in your project for testing.
Please thoroughly review the code before using it. Author of this project won't be responsible for any issue/loss.

# Author
Krishna Kumar Singh - kwishna@gmail.com