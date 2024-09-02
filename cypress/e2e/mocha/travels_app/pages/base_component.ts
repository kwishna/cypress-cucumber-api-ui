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
}

export const baseComponent = new BaseComponent();