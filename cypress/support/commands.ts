/// <reference path="../../node_modules/cypress/types/cypress.d.ts" />
/// <reference path="./../../cypress.d.ts" />
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import '@testing-library/cypress/add-commands'
import { attach } from '@badeball/cypress-cucumber-preprocessor';
Cypress.Commands.add(
    'typeRandomWords',
    { prevSubject: 'element' },
    (subject /* :JQuery<HTMLElement> */, count = 3, options?) => {
        return cy.wrap(subject).type(generateRandomWords(count), options)
    }
)
function generateRandomWords(count: number) {
    return `${(Math.random() * count)}`;
}

// For handling iFrames
Cypress.Commands.add('frame', (iframe) => {
    return cy.get(iframe)
        .its('0.contentDocument.body')
        .should('be.visible')
        .then(cy.wrap);
});

// For handling iFrames
Cypress.Commands.add('mouseOver', (el) => {
    return cy.get(el).trigger('mouseover');
});

Cypress.on("uncaught:exception", (msg) => {
    console.log("uncaught exception msg :", msg);
    return false;
});

Cypress.Commands.add("cucumberLog", function (data: string, mediaType: string = "text/json") {
    cy.log(data)
    attach(data, mediaType)
    cy.wait(1000);
});