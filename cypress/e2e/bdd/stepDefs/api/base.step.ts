import { DataTable, Given, When, Then, Step, attach} from '@badeball/cypress-cucumber-preprocessor';
import { BaseApi } from '../../pages/base.page';

When("I make API request with following info", function(this, docString: string) {
    cy.log(JSON.parse(docString));
    BaseApi.makeApiCall(JSON.parse(docString));
});

Then("I verify the API response", function(this, docString: string) {
    cy.log(JSON.parse(docString));
    BaseApi.verifySuccessfulResponse(JSON.parse(docString));
});

Then("I verify the failed API response", function(this, docString: string) {
    cy.log(JSON.parse(docString));
    BaseApi.verifyFailedResponse(JSON.parse(docString));
});

Then("I verify no response body", function() {
    BaseApi.verifyBlankResponseBody();
});