/// <reference path="../../node_modules/cypress/types/cypress.d.ts" />
/// <reference path="./../../cypress.d.ts" />
import './commands';
import "allure-cypress";
import '@4tw/cypress-drag-drop';
import '@testing-library/cypress/add-commands';
import '@cypress-audit/lighthouse/commands'
import 'cypress-mochawesome-reporter/register'; // For Mocha (working for cucumber as-well
// import 'cypress-mochawesome-reporter/cucumberSupport'; // For Cucumber (not working)
import 'cypress-wait-until';
import "cypress-axe";
import 'cypress-plugin-api';
import 'cypress-recurse/commands';
import '@cypress/xpath';
import 'cypress-map';
import 'cypress-real-events'
import { addCompareSnapshotCommand } from "cypress-visual-regression/dist/command";
// // import 'cypress-soft-assertions'; // removed - deprecated
// // import "cypress-cloud/support";
// import registerCypressGrep from '@cypress/grep/src/support'
// registerCypressGrep();

// @ts-ignore
// import cypressGrep from '@cypress/grep'
// cypressGrep()

addCompareSnapshotCommand({
    errorThreshold: 0.1
    // add more...
})


// Alternatively you can use CommonJS syntax:
// require('./commands')

// Disable Logs
// const app = window.top;
// if (app && !app.document.head.querySelector('[data-hide-command-log-request]')) {
//     const style = app.document.createElement('style');
//     style.innerHTML = '.command-name-request, .command-name-xhr { display: none }';
//     style.setAttribute('data-hide-command-log-request', '');
//     app.document.head.appendChild(style);
// }

Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('Special Error Message')) {
        // Returning false here prevents Cypress from failing the test
        return false;
    }
    // Allow other errors to fail the test
    return true;
});