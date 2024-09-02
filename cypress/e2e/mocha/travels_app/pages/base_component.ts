export class BaseComponent {
    // Locators
    logo = "img.logo";
    loader = "div.loading_home";

    /**
     * @description Navigate to Home Page
     */
    navigateToHomePage() {
        cy.log('Navigation to homepage');
        cy.visit('/', { failOnStatusCode: false });
    }

    /**
     * @description Ensure Home Page is Loaded
     */
    ensureHomePageIsLoaded() {
        cy.get("main div.homepage h4 strong")
            .should('have.text', 'Your Trip Starts Here!')
            .parent('h4')
            .next('p')
            .should('have.text', 'Let us help you plan your next journey — the one that will leave a lifetime of memories.')
            .get(this.loader)
            .should('not.be.visible', { timeout: 10000 });
    }

}

export const baseComponent = new BaseComponent();