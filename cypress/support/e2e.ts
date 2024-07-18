/// <reference path="../../node_modules/cypress/types/cypress.d.ts" />
/// <reference path="./../../cypress.d.ts" />
// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import "allure-cypress";
//For Cypress drag and drop plugin
import '@4tw/cypress-drag-drop';
import '@testing-library/cypress/add-commands';
import 'cypress-mochawesome-reporter/register';
import 'cypress-wait-until';
import "cypress-axe";
import 'cypress-plugin-api';
import 'cypress-recurse/commands';
chai.use(require("chai-json-schema"));

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