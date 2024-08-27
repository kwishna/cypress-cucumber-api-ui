/// <reference path="../../../../../node_modules/cypress/types/cypress.d.ts" />
import { searchOptionsPage } from "../pages/searchOptionsPage";

describe("UI testing", function () {

    before('Run once before - Set up environment', function () {
        cy.log('Run once - Set up environment');
    });

    beforeEach('Before Each - Home page navigation', function () {
        cy.log('Navigation to homepage');
        cy.visit('/', { failOnStatusCode: false });


        // Ensure homepage is loaded
        cy.get("main div.homepage h4 strong")
            .should('have.text', 'Your Trip Starts Here!')
            .parent('h4')
            .next('p')
            .should('have.text', 'Let us help you plan your next journey — the one that will leave a lifetime of memories.')
            .get('div.loading_home')
            .should('not.be.visible', { timeout: 10000 });
    });

    xit("E2E - Verify Logo & Nav Bar", async function () {
        // Ensure logo is visible
        cy.get('img.logo').should('be.visible');

        /*
        Explanation:
            1/ The have.text assertion, when applied to multiple elements, concatenates the text content of all matched elements into a single string.
            2/ It does this without any spaces or separators between the text of each element.
            3/ The order of the text in the assertion should match the order of the elements in the DOM.
        */

        // Verify Nav Bar - 1
        // cy.get("ul li a.nav-link[href]:not([role='button'])")
        //     .should('have.length', 5)
        //     .and('have.text', '\nFlights \nHotels \nTours \nCars \nBlogs&nbsp;');

        // Verify Nav Bar
        // cy.get("ul li a.nav-link[href]:not([role='button'])")
        //     .should('have.length', 5)
        //     .invoke('text')
        //     .should('match', /\nFlights \nHotels \nTours \nCars \nBlogs&nbsp;/);

        // Verify Nav Bar
        cy.get("ul li a.nav-link[href]:not([role='button'])")
            .should('have.length', 5)
            .then(($links) => {
                const texts = $links.map((i, el) => Cypress.$(el).text().trim().replace(/\s+/g, ' ')).get();
                expect(texts).to.deep.equal(['Flights', 'Hotels', 'Tours', 'Cars', 'Blogs']);
            });

        // Verify Nav Bar
        cy.get("ul li a.nav-link[href]:not([role='button'])")
            .should('have.length', 5)
            .then($els => {
                const expectedTexts = ['Flights', 'Hotels', 'Tours', 'Cars', 'Blogs'];
                $els.each((index, element) => {
                    expect(element.textContent.trim()).to.equal(expectedTexts[index]);
                });
            });

        // Verify Nav Bar
        const expectedTexts = ['Flights', 'Hotels', 'Tours', 'Cars', 'Blogs'];
        cy.get("ul li a.nav-link[href]:not([role='button'])")
            .should('have.length', 5)
            .each(($el, index) => {
                cy.wrap($el).text().invoke('trim').should('equal', expectedTexts[index]);
            });

        // -----------------------------------------------------------

        // Verify Nav Buttons
        cy.get("ul li a.nav-link[href][role='button']")
            .find('strong')
            .should('have.length', 3)
            .then(($els) => {
                const texts = $els.map((i, el) => el.textContent?.trim()).get();
                expect(texts).to.deep.equal(['English', 'USD', 'Account']);
            });

        // Verify Nav Buttons
        const lowerCaseBtns = [];
        cy.get("ul li a.nav-link[href][role='button']")
            .find('strong')
            .should('have.length', 3)
            .each(($el) => {
                lowerCaseBtns.push($el.text().trim().toLowerCase());
            })
            .then(($els) => {
                expect(lowerCaseBtns).to.deep.equal(['english', 'usd', 'account']);
            });
    });

    it("E2E - Search Options", function () {
        cy.log('Verify Search Options');

        cy.get("div.ShowSearchBox ul.nav li button")
            .should('have.length', 4) // have length 4
            .then(($els) => {
                // verify active class and text
                cy.wrap($els).eq(0).should('have.class', 'active').invoke('text').invoke('trim').should('equal', 'Flights');
                cy.wrap($els).eq(1).should('not.have.class', 'active').invoke('text').invoke('trim').should('equal', 'Hotels');
                cy.wrap($els).eq(2).should('not.have.class', 'active').invoke('text').invoke('trim').should('equal', 'Tours');
                cy.wrap($els).eq(3).should('not.have.class', 'active').invoke('text').invoke('trim').should('equal', 'Cars');

            });

        cy.get("div.ShowSearchBox ul.nav li button")
            .each(($el, index, $els) => {
                // Click on each button and verify it has the 'active' class
                cy.wrap($el).click().should('have.class', 'active');

                // Verify that all other buttons do not have the 'active' class
                cy.wrap($els)
                    .each((el, i) => {
                        if (i !== index) {
                            cy.wrap(el).should('not.have.class', 'active');
                        }
                    })

            })
            .find('span')
            .should('have.length', 4)
            .then(($els) => {
                // verify text of span elements
                const texts = $els.map((i, el) => el.textContent?.trim()).get();
                expect(texts).to.deep.equal(['Flights', 'Hotels', 'Tours', 'Cars']);
            });

    });

    xit("E2E - Better Search Options", function () {
        cy.log('Verify Search Options')

        // Verify text of span elements
        cy.get(searchOptionsPage.searchButtonSpans)
            .should('have.length', 4)
            .then(($els) => {
                const texts = $els.map((i, el) => el.textContent?.trim()).get();
                expect(texts).to.deep.equal(searchOptionsPage.expectedTexts);
            });

        // Verify initial state
        cy.get(searchOptionsPage.searchButtons)
            .should('have.length', 4)
            .each(($el, index) => {
                const isActive = index === 0;
                cy.wrap($el)
                    .should(isActive ? 'have.class' : 'not.have.class', 'active')
                    .invoke('text').invoke('trim').should('equal', searchOptionsPage.expectedTexts[index]);
            });

        // Click each button and verify active state
        cy.get(searchOptionsPage.searchButtons)
            .each(($el, index) => {
                cy.wrap($el).click().should('have.class', 'active');
                cy.get(searchOptionsPage.searchButtons).each(($btn, btnIndex) => {
                    if (btnIndex !== index) {
                        cy.wrap($btn).should('not.have.class', 'active');
                    }
                });
            });


    });

    afterEach('After Each - Immediately In Describe', function () {
        cy.log('After Each - Immediately In Describe');
    });

    after('Before All - Immediately In Describe', function () {
        cy.log('After All - Immediately In Describe');
    });
});
