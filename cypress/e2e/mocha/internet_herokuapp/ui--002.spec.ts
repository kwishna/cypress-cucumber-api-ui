/// <reference path="../../../../node_modules/cypress/types/cypress.d.ts" />
describe(`Cypress API - Querying - 2`, function () {

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

    it('A/B testing - 2 - text()', { tags: "abtest" }, function () {
        const paragraph = "Also known as split testing. This is a way in which businesses are able to simultaneously test and learn different versions of a page to see which text and/or functionality works best towards a desired outcome (e.g. a user action such as a click-through)."

        cy.get('[href="/abtest"]')
            .click()
            .url()
            .should('include', '/abtest')
            .get('p:contains("split testing")')
            .text()
            .should('include', paragraph);
    });

    it('A/B testing - 3 - attr()', { tags: "abtest" }, function () {
        cy.get('[href="/abtest"]')
            .click()
            .url()
            .should('include', '/abtest')
            .get('#content')
            .attr('class')
            .should('equal', 'large-12 columns');
    });

    it('A/B testing - 4 - css()', { tags: "abtest" }, function () {
        cy.get('[href="/abtest"]')
            .click()
            .url()
            .should('include', '/abtest')
            .get('#content')
            .css('display')
            .should('equal', 'block');
    });

    it('A/B testing - 5 - xpath()', { tags: "abtest" }, function () {
        cy.get('[href="/abtest"]')
            .click()
            .url()
            .should('include', '/abtest');

        cy.log('Navigated to A/B testing page')

        cy.xpath("//div[@id='content']")
            .attr('class')
            .should('equal', 'large-12 columns');
    });

    it('A/B testing - 6 - within()', { tags: "abtest" }, function () {
        cy.get('[href="/abtest"]')
            .click()
            .url()
            .should('include', '/abtest')
            .get('body')
            .within(() => {
                cy.xpath("//div[@id='content']")
                    .attr('class')
                    .should('equal', 'large-12 columns');
            });
    });

    afterEach('After Each - Immediately In Describe', function () {
        cy.log('After Each - Immediately In Describe');
    });

    after('Before All - Immediately In Describe', function () {
        cy.log('After All - Immediately In Describe');
    });

});