/// <reference path="../../../../node_modules/cypress/types/cypress.d.ts" />
describe(`Cypress API - Querying - 1`, function () {

    beforeEach('Before Each - Home page navigation', function () {
        cy.log('Navigation to homepage');
        cy.visit(Cypress.env("rahulshetty"))
            .url().should('contain', 'AutomationPractice');
    });

    it('Querying 1 - contains()', { tags: "abtest" }, function () {
        cy.contains("Practice Page") // any element containing `Practice Page`
            .invoke('css', 'color')
            .should('equal', 'rgb(33, 37, 41)');
    });

    it('Querying 2 - contains()', { tags: "abtest" }, function () {
        // Select the second radio button
        cy.get("div#radio-btn-example")
            .contains('Radio Button Example') // any element containing `Radio Button Example` within `div#radio-btn-example`
            .nextAll('label').should('have.length', 3) // following-siblings
            .eq(-2) // 2nd last label
            .find("input[type='radio']") // This selects the second radio button (2)
            .click();

        // Verify the selected radio button
        cy.get("div#radio-btn-example") // Radio block
            .find('input[type="radio"]:checked') // Get the 'checked' radio button
            .should('have.value', 'radio2')
            .should('be.checked'); // Ensure the radio input is checked

        cy.log('Verify selected radio option');

        cy.get("div#radio-btn-example") // Radio block
            .contains('Radio Button Example') // Label
            .nextAll('label').should('have.length', 3) // Siblings of the Label
            .eq(-2) // Select the second last label
            .find('input[type="radio"]') // Find the radio input within the label
            .should('be.checked'); // Ensure the radio input is checked

        // checked -> radio or checkbox
        // selected -> dropdown
    });
});