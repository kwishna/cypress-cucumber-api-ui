/// <reference path="../../../../node_modules/cypress/types/cypress.d.ts" />
// https://glebbahmutov.com/cypress-examples/commands/querying.html
// https://api.jquery.com/
// https://docs.cypress.io/api/table-of-contents/
// https://developer.mozilla.org/en-US/docs/Web/API
// `document.evalute` for Xpath - https://developer.mozilla.org/en-US/docs/Web/API/Document/evaluate
// 
/*
    1. :nth-child(n) - Selects the element that is the nth child of its parent, regardless of type.
        <div>
            <p>Paragraph 1</p>
            <span>Span 1</span>
            <p>Paragraph 2</p> <!-- This will be selected --> // `p:nth-child(2)` : Selects the second child of its parent if it is a <p> element
            <p>Paragraph 3</p>
        </div>

    2. :nth-of-type(n) - Selects the nth element of its type (tag name) within its parent.
        <div>
            <p>Paragraph 1</p>
            <span>Span 1</span>
            <p>Paragraph 2</p> <!-- This will be selected --> // `p:nth-of-type(2)`: Selects the second <p> element of its parent
            <p>Paragraph 3</p>
        </div>

    3.  :first-child - 1st child - Selects the first child of a parent element.
    4.  :last-child - 1st child - Selects the last child of a parent element.
    5.  :nth-last-child(n) - Selects the nth child from the end of a parent element.
    6.  :first-of-type - Selects the first element of its type within its parent.
    7.  :last-of-type - Selects the last element of its type within its parent.
    8.  :nth-last-of-type(n) - Selects the nth element of its type from the end of its parent.
    9.  :only-child - Selects an element that is the only child of its parent.
    10. :only-of-type - Selects an element that is the only one of its type within its parent.
    11. :hover - Selects an element when it is being hovered by the mouse pointer.
    12. :focus - Selects an element when it has focus (e.g., a form input).
    13. :active - Selects an element that is being activated by the user (e.g., a button being clicked).
    14. :checked - Selects an input element (e.g., checkbox or radio button) that is checked.
    15. :empty - Selects an element that has no children.
    16. :not(selector) - Selects elements that do not match the given selector.
    17. :enabled - Selects form elements that are enabled.
    18. :disabled - Selects form elements that are disabled.
    19. :required - Selects form elements that are required.
    20. :optional - Selects form elements that are optional.
    21. ::before - Inserts content before the content of an element.
    22. ::after - Inserts content after the content of an element.
    23. ::first-letter - Selects the first letter of an element.
    24. ::first-line - Selects the first line of an element.
    
    // ----------------------------------------------------------------------------------------------------------------
    p:first-child {
        color: blue;
    }

    p:last-child {
        color: green;
    }

    p:nth-child(2) {
        color: red;
    }

    p:nth-of-type(2) {
        color: purple;
    }

    a:hover {
        color: orange;
    }

    input:focus {
        border-color: blue;
    }

    button:active {
        background-color: green;
    }

    input:checked {
        background-color: yellow;
    }

    p:empty {
        display: none;
    }

    p:not(.highlight) {
        color: gray;
    }

    input:enabled {
        background-color: white;
    }

    input:disabled {
        background-color: lightgray;
    }

    input:required {
        border: 2px solid red;
    }

    input:optional {
        border: 2px solid green;
    }

    p::before {
        content: "Note: ";
        font-weight: bold;
    }

    p::after {
        content: " (End of paragraph)";
        font-style: italic;
    }

    p::first-letter {
        font-size: 2em;
        color: red;
    }

    p::first-line {
        font-weight: bold;
    }
    // ----------------------------------------------------------------------------------------------------------------

    1. next() - cy.get('h2').next('p').should('have.text', 'Expected text');
            - Selects the <p> element immediately following an <h2> and asserts its text.
    
    2. prev() - cy.get('p').prev('h2').should('have.text', 'Previous Heading');
            - Selects the <h2> element immediately before a <p> and asserts its text.
    
    3. siblings() - cy.get('h2').siblings('p').should('have.length', 2);
            - Selects all sibling <p> elements of an <h2> and asserts the count.
    
    4. find() - cy.get('div').find('p').should('have.length', 3);
            - cy.get('div').find('p').should('have.length', 3);
    
    5. children() - cy.get('div').children('p').should('have.length', 2);
            - cy.get('div').children('p').should('have.length', 2);
    
    6. parent() - cy.get('p').parent().should('have.class', 'parent-class');
            - cy.get('p').parent().should('have.class', 'parent-class');

    7. closest() - cy.get('p').closest('div').should('have.class', 'parent-class');
            - Finds the nearest ancestor <div> of a <p> element and asserts its class.
    
    8. prevAll() - cy.get('p').prevAll('h2').should('have.length', 1);
            - cy.get('p').prevAll('h2').should('have.length', 1);
    
    9. nextAll() - Selects all following sibling <p> elements of an <h2> and asserts the count.
            - cy.get('h2').nextAll('p').should('have.length', 2);

    10. prevUntil() - cy.get('p').prevUntil('h2').should('have.length', 1);
            - cy.get('p').prevUntil('h2').should('have.length', 1);

    11. nextUntil() - cy.get('h2').nextUntil('h3').should('have.length', 2);
            - Selects all following siblings of an <h2> up to but not including an <h3>.

------------------------------------- Get Text - 1 -----------------------------------------
cy.get('selector').invoke('text').then((text) => {
  cy.log(text);
  expect(text).to.include('expected text');
});

cy.get('selector').then(($element) => {
  const text = $element.text();
  cy.log(text);
  expect(text).to.include('expected text');
});
----------------------------------------------------------------------------------------------
*/
describe(`Cypress API - Querying - 1`, function () {

    before('Run once before - Set up environment', function () {

        // cy.intercept({
        //     method: 'GET',
        //     url: '.log.optimizely.com'
        // }, (req) => {
        //     // intercept.on("response", (res) => {
        //     //     if(res.statusCode !== 200) {
        //     //         res.statusCode === 200;
        //     //     }
        //     // })

        //     // route.destroy();

        //     req.reply({
        //         statusCode: 200,
        //         forceNetworkError: false,
        //         body: {
        //             "status": "OK"
        //         }
        //     });
        // });

        // cy.intercept({
        //     method: 'GET',
        //     url: '*log*',
        //     hostname: 'optimizely.com',
        // }).as('@opt');

        // cy.wait('@opt').then((req) => {
        //     req.
        // })

        cy.log('Run once - Set up environment');
    });

    beforeEach('Before Each - Home page navigation', function () {
        cy.log('Navigation to homepage');
        cy.visit('/');

        cy.get("h1.heading")
            .should('have.text', 'Welcome to the-internet')
            .next('h2') // immediately following sibling
            .should('have.text', 'Available Examples');
    });

    const paragraph = "Also known as split testing. This is a way in which businesses are able to simultaneously test and learn different versions of a page to see which text and/or functionality works best towards a desired outcome (e.g. a user action such as a click-through)."

    it('A/B testing - 1 - url()', { tags: "abtest" }, function () {
        cy.get('[href="/abtest"]')
            .click()
            .url().should('include', '/abtest') // wait for url to match expected value
            .get('p:contains("split testing")') // <p> that contains text()
            .should('be.visible')
            .and('include.text', paragraph);
    });

    it('Querying: get()', { tags: "abtest" }, function () {
        cy.get('[href="/abtest"]') // Searches from root. i.e document
            .click()
            .url().should('include', '/abtest') // wait for url to contain /abtest
            .get('p:contains("split testing")')
            .should('be.visible')
            .and('include.text', paragraph);
    });

    it('Querying: - find(), next()', { tags: "abtest" }, function () {
        cy.get('[href="/abtest"]')
            .click()
            .url().should('include', '/abtest');
        
        cy.get('div#content').should('exist')
            .find('div.example').should('exist') // `find` within `div#content`, not `root`
            .find('h3').should('exist').should('contain.text', 'A/B')  // `find` within `div.example`, not `root`
            .next('p').should('contain.text', 'Also known as split testing');
    });

    afterEach('After Each - Immediately In Describe', function () {
        cy.log('After Each - Immediately In Describe');
    });

    after('Before All - Immediately In Describe', function () {
        cy.log('After All - Immediately In Describe');
    });

});