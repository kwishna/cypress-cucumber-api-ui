/// <reference path="../../../../node_modules/cypress/types/cypress.d.ts" />

describe("API testing - Querying", function () {

    before('Run once before - Set up environment', function () {

        cy.log('Run once - Set up environment');
    });

    beforeEach('Before Each - Home page navigation', function () {
        cy.log('Navigation to homepage');
        cy.visit('/');

        cy.get("h1.heading")
            .should('have.text', 'Welcome to the-internet')
            .next('h2')
            .should('have.text', 'Available Examples');
    });

    it("Visbility: 1 and :contains()", function () {

        cy.get("a:contains('Add/Remove Elements')")
            .text().then((r) => cy.log(r));

        cy.get("a:contains('Add/Remove Elements')")
            .click()
            .url().should('contain', 'add_remove_elements')
            .title().should('equal', 'The Internet')

        cy.get("div.example button[onclick='addElement()']")
            .click()
            .get('div#elements button').should('be.visible').should('satisfy', Cypress.dom.isVisible)
            .isVisible().should('equal', true)

        cy.get("div#elements button").as('dlt').click()
        cy.get('@dlt').should('not.exist');
    });

    it("Visbility: 3", function () {

        cy.get("a:contains('Add/Remove Elements')")
            .click()
            .url().should('contain', 'add_remove_elements')
            .title().should('equal', 'The Internet')
            .get("div.example button[onclick='addElement()']")
            .click()
            .get('div#elements button')
            .mustBeVisible()
            .click()
            .mustBeHidden();
    });

    it("Visbility: 3", function () {

        cy.get("a:contains('Add/Remove Elements')")
            .click()
            .url().should('contain', 'add_remove_elements')
            .title().should('equal', 'The Internet')
            .get("div.example button[onclick='addElement()']")
            .click()
            .click()
            .click()
            .get('div#elements button')
             // if any of element is not visibile. Cypress will not retry. Because, `then` statement is not retried.
            .then(($el) => Cypress._.map($el, Cypress.dom.isVisible))
            .should('deep.equal', [true, true, true])
    });

    afterEach('After Each - Immediately In Describe', function () {
        cy.log('After Each - Immediately In Describe');
    });

    after('Before All - Immediately In Describe', function () {
        cy.log('After All - Immediately In Describe');
    });

});