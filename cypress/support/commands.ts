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
import '@testing-library/cypress/add-commands';
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
Cypress.Commands.add('mouseOver', (el): Cypress.Chainable<JQuery<HTMLElement>> => {
    return cy.get(el).trigger('mouseover');
});

Cypress.on("uncaught:exception", (msg): boolean => {
    console.log("uncaught exception msg :", msg);
    return false;
});

Cypress.Commands.add("cucumberLog", function (data: string, mediaType: string = "text/json"): void {
    cy.log(data)
    attach(data, mediaType)
    cy.wait(1000);
});

Cypress.Commands.add('mouseOver', (el) => {
    return cy.get(el).trigger('mouseover');
});

Cypress.Commands.add('assertList', { prevSubject: true },
    function (subject, expected): Cypress.Chainable<JQuery<any>> {
        return cy.wrap(subject).should((items) => {
            expect(items.get().map((a) => a.textContent)).to.deep.equal(expected)
        })
    }
);

Cypress.Commands.add('getAttrList', { prevSubject: true },
    function (subject, attr): Cypress.Chainable<string[]> {
        return cy.wrap(Cypress._.map(subject, ($el) => $el.getAttribute(attr)));
    }
);

Cypress.Commands.add('text', { prevSubject: true }, (subject) => {
    return cy.wrap(subject).invoke('text');
});

Cypress.Commands.add('attr', { prevSubject: true }, (subject, name: string) => {
    return cy.wrap(subject).invoke('attr', name);
});

Cypress.Commands.add('css', { prevSubject: true }, (subject, key: string) => {
    return cy.wrap(subject).invoke('css', key);
});

Cypress.Commands.add('byXpath', (selector) => { // not tested yet!
    return cy.wrap(document.evaluate(selector, document, null, XPathResult.ANY_TYPE, null)).invoke('iterateNext');
});

Cypress.Commands.add('isVisible', { prevSubject: true }, (subject) => {
    return cy.wrap(subject).invoke('is', ':visible');
});

Cypress.Commands.add('isHidden', { prevSubject: true }, (subject) => {
    return cy.wrap(subject).invoke('is', ':hidden');
});

Cypress.Commands.add('mustBeVisible', { prevSubject: true }, (subject) => {
    cy.wrap(subject).invoke('is', ':visible').should('equal', true);
    return cy.wrap(subject);
});

Cypress.Commands.add('mustBeHidden', { prevSubject: true }, (subject) => {
    cy.wrap(subject).invoke('is', ':hidden').should('equal', true);
    return cy.wrap(subject);
});

Cypress.Commands.add('waitForElementToDisappear', (selector, timeout = 10000) => {
    cy.get('body').then($body => {
      if ($body.find(selector).length > 0) {
        cy.get(selector, { timeout }).should('not.exist');
      }
    });
});

// Cypress.Screenshot.defaults({ screenshotOnRunFailure: false })
// before(function before() {
//   // Do not truncate assertion outputs of arrays and objects
//   window.chai.config.truncateThreshold = 0
// })

// ---------------------------------------------------------------------------------------------------------

// //For Cypress drag and drop custom command
// Cypress.Commands.add('draganddrop', (dragSelector, dropSelector) => {
//     cy.get(dragSelector).should('exist')
//         .get(dropSelector).should('exist');

//     const draggable = Cypress.$(dragSelector)[0]; // Pick up this
//     const droppable = Cypress.$(dropSelector)[0]; // Drop over this

//     const coords = droppable.getBoundingClientRect()
//     draggable.dispatchEvent(new MouseEvent('mousedown'));
//     draggable.dispatchEvent(new MouseEvent('mousemove', { clientX: 10, clientY: 0 }));
//     draggable.dispatchEvent(new MouseEvent('mousemove', {
//         clientX: coords.left + 10,
//         clientY: coords.top + 10  // A few extra pixels to get the ordering right
//     }));
//     draggable.dispatchEvent(new MouseEvent('mouseup'));
//     return cy.get(dropSelector);
// })