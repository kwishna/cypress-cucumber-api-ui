/// <reference path="../../../../node_modules/cypress/types/cypress.d.ts" />
describe(`Cypress API - Querying - 1`, function () {

    beforeEach('Before Each - Home page navigation', function () {
        cy.log('Navigation to homepage');
        cy.visit(Cypress.env("rahulshetty"))
            .url().should('contain', 'AutomationPractice');
    });

    it('Traversal DOM - children()', { tags: "children" }, function () {
        /*
            <fieldset>
                <legend>Web Table Example</legend>
                <table id="product" name="courses" class="table-display" border="1">
                    <tbody>
                        <tr>
                            <th>Instructor</th>
                            <th>Course</th>
                            <th>Price</th>
                        </tr>
                        <tr>
                            <td>Rahul Shetty</td>
                            <td>Selenium Webdriver with Java Basics + Advanced + Interview Guide</td>
                            <td>30</td>
                        </tr>
                        <tr>
                            <td>Rahul Shetty</td>
                            <td>WebSecurity Testing for Beginners-QA knowledge to next level</td>
                            <td>20</td>
                        </tr>
                    </tbody>
                </table>
            </fieldset>
        */
        cy.get("legend:contains('Web Table Example')")
            .next('table') // following immediate sibling - <table>
            .children('tbody') // children which is <tbody>
            // .children(':visible')
            // .children(':not(:visible)')
            .children() // all <tr> children of <tbody>
            .eq(1) // 2nd <tr>
            .children(':contains(30)') // all <td>, who are children of previous <tr>
            .prev() // preceding-sibling <td>
            .should('be.visible')
            .and('have.text', 'Selenium Webdriver with Java Basics + Advanced + Interview Guide');
    });

    it('Traversal DOM - closet()', { tags: "closet" }, function () {
        cy.get("legend:contains('Web Table Example')")
            .next('table') // following immediate sibling - <table>
            .children('tbody') // children which is <tbody>
            .children('tr')
            // .closest('legend') // Fails
            .closest('tbody')
            .and('have.length', 1);
    });

    it('Traversal DOM - eq()', { tags: "eq" }, function () {
        cy.get("legend:contains('Web Table Example')")
            .next('table') // following immediate sibling - <table>
            .children('tbody') // children which is <tbody>
            .children() // all <tr> children of <tbody>
            .eq(2) // 3rd <tr>
            .should('be.visible')
            .children()
            .eq(-1) // last <td>
            .and('have.text', '25');
    });

    it('Traversal DOM - filter() by property', { tags: "filter" }, function () {
        // Select 2nd radio button
        cy.get("div#radio-btn-example")
            .contains('Radio Button Example') // any element containing `Radio Button Example` within `div#radio-btn-example`
            .nextAll('label').should('have.length', 3) // following-siblings
            .eq(-2) // 2nd last label
            .find("input[type='radio']") // This selects the second radio button (2)
            .click();

        // Filter the checked radio option and verify its value 
        cy.get("div#radio-btn-example")
            .find('input') // all input elements
            .filter(':checked') // filter by checkability
            .should('have.length', 1) // must have length 1
            .and('have.value', 'radio2'); // have value 'radio2'
    });

    it('Traversal DOM - filter() by attribute', { tags: "filter" }, function () {
        // Select 2nd radio button
        cy.get("div#radio-btn-example")
            .contains('Radio Button Example') // any element containing `Radio Button Example` within `div#radio-btn-example`
            .nextAll('label').should('have.length', 3) // following-siblings
            .eq(-2) // 2nd last label
            .find("input[type='radio']") // This selects the second radio button (2)
            .click();

        // Filter the checked radio option and verify its value 
        cy.get("div#radio-btn-example")
            .find('input') // all input elements
            .filter('[type="radio"]', { log: true, timeout: 5000 }) // filter by attribute
            .should('have.length', 3) // must have length 3
            .getAttrList("value").should('have.ordered.members', ['radio1', 'radio2', 'radio3'])
    });

    it('Traversal DOM - filter() by visibility', { tags: "filter" }, function () {
        // Select 2nd radio button
        cy.get("div#radio-btn-example")
            .contains('Radio Button Example') // any element containing `Radio Button Example` within `div#radio-btn-example`
            .nextAll('label').should('have.length', 3) // following-siblings
            .eq(-2) // 2nd last label
            .find("input[type='radio']") // This selects the second radio button (2)
            .click();

        // Filter the checked radio option and verify its value 
        cy.get("div#radio-btn-example")
            .find('input') // all input elements
            .filter(':visible') // filter by visiblity
            .should('have.length', 3) // must have length 1
            .getAttrList("value").should('have.ordered.members', ['radio1', 'radio2', 'radio3'])
    });

    it('Traversal DOM - filter() by callback', { tags: "filter" }, function () {
        // Select 2nd radio button
        cy.get("div#radio-btn-example")
            .contains('Radio Button Example') // any element containing `Radio Button Example` within `div#radio-btn-example`
            .nextAll('label').should('have.length', 3) // following-siblings
            .eq(-2) // 2nd last label
            .find("input[type='radio']") // This selects the second radio button (2)
            .click();

        // Filter the checked radio option and verify its value 
        cy.get("div#radio-btn-example")
            .find('input') // all input elements
            .filter((k, el) => {
                // k is the 0-based index
                // el is the DOM element
                return (
                    el.classList.contains('radioButton') ||
                    el.getAttribute('name').includes('radioButton')
                )
            })
            .filter(':checked') // filter by visiblity
            .should('have.length', 1) // must have length 1
            .and('have.value', 'radio2'); // have value 'radio2'
    });
});