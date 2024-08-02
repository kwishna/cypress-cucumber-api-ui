/// <reference path="../../../../node_modules/cypress/types/cypress.d.ts" />

describe(`Cypress API - Querying - 1`, function () {

    beforeEach('Before Each - Home page navigation', function () {
        cy.log('Navigation to homepage');
        cy.visit(Cypress.env("rahulshetty"))
            .url().should('contain', 'AutomationPractice');
    });

    it('Traversal DOM - first()', { tags: "first" }, function () {
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
            .children('tr') // all <tr> children of <tbody>
            .eq(1) // First Matching Element
            .find('td') // all <td> elements
            .first() // 1st <td> element
            .should('be.visible')
            .and('have.text', 'Rahul Shetty')
    });

    it('Traversal DOM - last()', { tags: "last" }, function () {
        cy.get("legend:contains('Web Table Example')")
            .next('table') // following immediate sibling - <table>
            .children('tbody') // children which is <tbody>
            .children('tr') // all <tr> children of <tbody>
            .eq(1) // First Matching Element
            .find('td') // all <td> elements
            .last() // last <td> element
            .should('be.visible')
            .and('have.text', '30');
    });

    it('Traversal DOM - :first :last', { tags: ":first" }, function () {
        cy.get("legend:contains('Web Table Example')")
            .next('table') // following immediate sibling - <table>
            .children('tbody') // children which is <tbody>
            .find('tr:first') // all <tr> children of <tbody>
            // .eq(1) // First Matching Element
            .find('th:last') // last <td> element
            .should('be.visible')
            .and('have.text', 'Price');
    });

    it('Traversal DOM - filter :first :last', { tags: ":first" }, function () {
        cy.get("legend:contains('Web Table Example')")
            .next('table') // following immediate sibling - <table>
            .children('tbody') // children which is <tbody>
            .find('tr')
            .filter(':first') // all <tr> children of <tbody>
            .find('th') // last <td> element
            .filter(':last') // last <td> element
            .should('be.visible')
            .and('have.text', 'Price');
    });
});