import { DataTable, Given, When, Then, Step, attach} from '@badeball/cypress-cucumber-preprocessor';
import { ChallengerApi } from '../../pages/challengers/challenger.page';

Given("I set the baseurl", function () {
    const baseUrl = Cypress.env("CHALLENGER_BASE_URL");
    cy.wrap(baseUrl).should('not.be.undefined');
    Cypress.config('baseUrl', baseUrl);
});

When("I register myself to challenger API at 'POST challenger'", function () {
    ChallengerApi.registerToChallengerApi();
});

Then("I verify the successful registeration", function () {
    ChallengerApi.verifyChallengerApiRegisteration();
});

Given("I have the challenger id", function () {
    const challengerId = Cypress.env("X-CHALLENGER"); // challanger_id may come from previous API call or stored in `cypress.env.json`.
    cy.wrap(challengerId).should('not.be.undefined');
    cy.log(`challenger id is: ${challengerId}`);
});

When("I get the list of all challenges", function () {
    ChallengerApi.getAllChallenges(Cypress.env("X-CHALLENGER"));
});

Then("I verify the list of all challenges", function () {
    ChallengerApi.verifyListOfChallanges();
});