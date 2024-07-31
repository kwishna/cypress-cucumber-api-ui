/// <reference path="../../../../node_modules/cypress/types/cypress.d.ts" />
describe(`Cypress API - Querying - 1`, function () {

    beforeEach('Before Each - Home page navigation', function () {
        cy.log('Navigation to homepage');
        cy.visit(Cypress.env("rahulshetty"))
            .url().should('contain', 'AutomationPractice');
    });

    it('Querying - within()', { tags: "within" }, function () {
        /*
        <div class="left-align" id="radio-btn-example">
            <fieldset>
                <legend>Radio Button Example</legend>
                <label for="radio1">
                    <input value="radio1" name="radioButton" class="radioButton" type="radio"> Radio1
                </label>
                <label for="radio2">
                    <input value="radio2" name="radioButton" class="radioButton" type="radio"> Radio2
                </label>
                <label for="radio3">
                    <input value="radio3" name="radioButton" class="radioButton" type="radio"> Radio3
                </label>
            </fieldset>
        </div>
        */
        cy.get("div#radio-btn-example")
            .find('fieldset')
            // within() - Scopes all subsequent cy commands to within this element. For example, working within `form`.
            // cy.within() won't work if `fieldset` matches multiple elements.
            .within(() => {
                cy.get('label:first')
                    .find("[name='radioButton']")
                    .click()
                    .should('be.checked');

                cy.get('label:last')
                    .find("[name='radioButton']")
                    .click()
                    .should('be.checked');
            })
            .children('legend') // 'legend' is children of fieldset.
            .should('have.text', 'Radio Button Example')
        // checked -> radio or checkbox
        // selected -> dropdown
    });

    it('Querying - within() & root() - Temporarily Escape', { tags: "within" }, function () {

        cy.root()  // root() == `html` | Temporarily Escape The `within` scope.
            .get('header')
            .next('h1')
            .should('contain.text', 'Practice Page');

        cy.get("div#radio-btn-example")
            .find('fieldset')
            .within(() => {

                cy.root().then(root => cy.log(JSON.stringify(root))); // root is `fieldset` | Escaping the within() scope!!

                cy.get('label:last') // maintains the `within` scope.
                    .find("[name='radioButton']")
                    .click()
                    .should('be.checked');
            });
    });

    it(`Querying - root()`, { tags: 'root' }, function () {
        cy.root()
            .should('match', 'html')
            .and('have.attr', 'lang', 'en');
    });
});