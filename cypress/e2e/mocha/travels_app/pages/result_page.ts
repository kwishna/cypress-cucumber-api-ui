import { BaseComponent } from "./base_component";

class ResultPage extends BaseComponent {
    // Locators
    resultSpan = /\d{1,3} Flights Found/;

    STOPS_FILTERS = ['All Flights', 'Direct', 'Stops 1', 'Stops 2'];
    AIRLINES_FILTERS = [
        'Pakistan International Airlines', 'Air Arabia', 'Emirates', 'Kuwait Airways',
        'Gulf Air Bahrain', 'Qatar Airways', 'flydubai', 'Flynas', 'Turkish Airlines', 'Gulf Air',
        'Saudi Arabian Airlines', 'SriLankan Airlines', 'Qatar Airways', 'Lufthansa', 'IndiGo'
    ];

    /**
     * @description Verify Flight Stops Filter
     * @returns {void}
     */
    verifyFlightStopsFilter(): void {
        cy.log(`Verify Flight Stops Filter`);
        cy.get('p strong')
            .contains('Flight Stops')
            .parent('p')
            .siblings('div')
            .find('ul li label')
            .should('have.length.gte', 3)
            .each(($el, index) => {
                cy.wrap($el).prev('input').should('have.attr', 'type', 'radio');
            })
            .then(($list) => {
                const stops = Cypress._.map($list, (el) => {
                    return el.textContent?.trim();
                });
                expect(this.STOPS_FILTERS).to.include.members(stops);
            });
    }

    /**
     * @description Verify One Way Airlines Filter
     * @returns {void}
     */
    verifyOneWayAirlinesFilter(): void {
        cy.log(`Verify One Way Airlines Filter`);
        cy.get('p strong')
            .contains('Oneway Airlines')
            .parent('p')
            .siblings('ul')
            .find('li label')
            .should('have.length.gte', 5)
            .each(($el, index) => {
                cy.wrap($el).prev('input').should('have.attr', 'type', 'checkbox');
            })
            .then(($list) => {
                cy.log(`Verify One Way Airlines Filter Values.`);
                const airlines = Cypress._.map($list, (el) => {
                    return el.textContent?.trim();
                });
                expect(this.AIRLINES_FILTERS).to.include.members(airlines);
            });
    }

    /**
     * @description Verify One Way Airlines Filter
     * @returns {void}
     */
    verifyReturnAirlinesFilter(): void {
        cy.log(`Verify Return Airlines Filter`);
        cy.get('p strong')
            .contains('Return Airlines')
            .parent('p')
            .siblings('ul')
            .find('li label')
            .should('have.length.gte', 5)
            .each(($el, index) => {
                cy.wrap($el).prev('input').should('have.attr', 'type', 'checkbox');
            })
            .then(($list) => {
                const airlines = Cypress._.map($list, (el) => {
                    return el.textContent?.trim();
                });
                expect(this.AIRLINES_FILTERS).to.include.members(airlines);
            });
    }

    /**
     * @description Verify Price Filter
     * @returns {void}
     */
    verifyPriceFilter(): void {
        cy.log(`Verify Price Filter`);
        cy.get("ul[role='tablist'] li.nav-item button span")
            .should('have.length', 2)
            .then(($list) => {
                const price = Cypress._.map($list, (el) => {
                    return el.textContent?.trim();
                });
                expect(price).to.deep.equal(['Lowest to Higher', 'Highest to Lower']);
            });
    }

    verifyResultFlights() {
        cy.log(`Verify Result Flights`);
        cy.get("ul#flight--list-targets li.card")
            .should('have.length.gte', 1)
            .find("form div")
            .eq(0)
            .within(() => {
                cy.get("div.row").within(() => {
                    cy.get("img").should("be.visible");
                    cy.get("div h6").should("be.visible").find("strong").should("be.visible").parent('h6').siblings('p small').should("be.visible");
                    cy.get("div.trip-details").find("p").eq(0).find('strong').should("be.visible").parent('p').siblings("p").should("be.visible");
                    cy.get("div.trip-details").find("p").eq(1).find('strong').should("be.visible").parent('p').siblings("p").should("be.visible");
                })
            })
    }

    /**
     * @description Verify Result Span
     * @returns {void}
     */
    verifyFlightsSearchResult(): void {
        cy.log(`Verify Flights Search Result`);
        cy.get('h2 span').contains(this.resultSpan, { timeout: 15000 }).should('be.visible');
    }

    applyFlightStopsFilters() {
        cy.location
    }
}

export const resultPage = new ResultPage();