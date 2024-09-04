export class BaseComponent {
    // Locators
    logo = "img.logo";
    loader = "div.loading_home";

    /**
     * @description Navigate to Home Page
     */
    navigateToHomePage() {
        cy.log('Navigation to homepage');
        cy.visit('/flights', { failOnStatusCode: false });
    }

    /**
     * @description Ensure Home Page is Loaded
     */
    ensureHomePageIsLoaded() {
        cy.log(`Ensure Home Page is Loaded`);
        cy.get("main div.homepage h4 strong")
            .should('have.text', 'Your Trip Starts Here!')
            .parent('h4')
            .next('p')
            .should('have.text', 'Let us help you plan your next journey — the one that will leave a lifetime of memories.')
            .get(this.loader)
            .should('not.be.visible', { timeout: 10000 });
    }

    /**
     * @description Verify Logo is Visible
     */
    verifyLogoIsVisible() {
        cy.log(`Verify Logo is Visible`);
        cy.get(this.logo).should('be.visible');
    }

    /**
     * @description Wait for Loader to Disappear
     * @param timeout - Timeout of the wait
     * @param interval - Interval of the wait
     */
    waitForLoaderToDisappear(timeout = 10000, interval = 500) {
        cy.log(`Wait for Loader to Disappear`);
        this.waitForElementToNotExistInDOM(this.loader, timeout, interval);
    }

    /**
     * @description Wait for Element to Not Exist in DOM
     * @param selector - Selector of the element to wait for
     * @param timeout - Timeout of the wait
     * @param interval - Interval of the wait
     */
    waitForElementToNotExistInDOM(selector: string, timeout = 10000, interval = 500) {
        cy.log(`Wait for Element to Not Exist in DOM`);
        cy.waitUntil(() =>
            Cypress.$(selector).length === 0,
            {
                timeout: timeout,
                interval: interval,
                // verbose: true,
                log: true,
                errorMsg: `Element ${selector} did not disappear within ${timeout}ms`
            }
        );
    }

    /**
     * @description Wait for Element to Be Visible
     * @param selector - Selector of the element to wait for
     * @param timeout - Timeout of the wait
     * @param interval - Interval of the wait
     */
    waitForElementToBeVisible(selector: string, timeout = 10000, interval = 500) {
        cy.log(`Wait for Element to Be Visible`);
        cy.waitUntil(() =>
            Cypress.$(selector).is(':visible'),
            {
                timeout: timeout,
                interval: interval,
                errorMsg: `Element ${selector} did not become visible within ${timeout}ms`
            }
        );
    }

    /**
     * @description Wait for Element to Not Be Visible
     * @param selector - Selector of the element to wait for
     * @param timeout - Timeout of the wait
     * @param interval - Interval of the wait
    */
    waitForElementToNotBeVisible(selector: string, timeout = 10000, interval = 500) {
        cy.log(`Wait for Element to Not Be Visible`);
        cy.waitUntil(() =>
            Cypress.$(selector).is(':hidden'), // waits for all elements to be hidden
            {
                timeout: timeout,
                interval: interval,
                errorMsg: `Element ${selector} did not become hidden within ${timeout}ms`
            }
        );

        // cy.waitUntil(() => {
        //     const $el = Cypress.$(selector);
        //     return $el.length === 0 || !$el.is(':visible');
        // }, {
        //     timeout: timeout,
        //     interval: interval,
        //     errorMsg: `Element ${selector} did not become invisible or disappear within ${timeout}ms`
        // });
    }
}

export const baseComponent = new BaseComponent();