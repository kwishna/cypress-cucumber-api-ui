/// <reference path="../../../../../node_modules/cypress/types/cypress.d.ts" />
import moment from "moment";
import { searchPage } from "../pages/search_page";
import { baseComponent } from "../pages/base_component";
import { resultPage } from "../pages/result_page";

describe("UI testing - Search Flights", function () {

    const today = moment().format('DD-MM-YYYY');
    const tomorrow = moment().add(1, 'days').format('DD-MM-YYYY');
    const afterTomorrow = moment().add(2, 'days').format('DD-MM-YYYY');

    before('Run once before - Set up environment', function () {
        cy.log('Run once - Set up environment');
    });

    beforeEach('Before Each - Home page navigation', function () {
        // Navigate to Home Page
        baseComponent.navigateToHomePage();

        // Ensure Home Page is Loaded
        baseComponent.ensureHomePageIsLoaded();

        // Ensure logo is visible
        baseComponent.verifyLogoIsVisible();
    });

    it("E2E - Search Flights - One Way", function () {

        const searchData = {
            from: 'LHE',
            to: 'DXB',
            departDate: afterTomorrow,
            passengers: { adults: 1, childs: 0, infants: 0 }
        };

        // Select Flights
        searchPage.selectSearchOption('Flights');

        // Select One Way Flights
        searchPage.selectFlightsType('oneway');

        // Fill One Way Flight Form
        searchPage.fillOneWayFlightForm(searchData);

        // Submit Flight Search
        searchPage.submitFlightSearch();

        // Verify Flights Search Result
        resultPage.verifyFlightsSearchResult();

        // Verify Flight Stops Filter
        resultPage.verifyFlightStopsFilter();

        // Verify Airlines Filter
        resultPage.verifyOneWayAirlinesFilter();

        // Verify Price Filter
        resultPage.verifyPriceFilter();

         // Apply Flight Stops Filter
        //  resultPage.applyFlightStopsFilter();

         // Apply Airlines Filter
        //  resultPage.applyAirlinesFilter();
 
         // Apply Price Filter
        //  resultPage.applyPriceFilter();
    });

    afterEach('After Each - Immediately In Describe', function () {
        cy.log('After Each - Immediately In Describe');
    });

    after('Before All - Immediately In Describe', function () {
        cy.log('After All - Immediately In Describe');
    });
});
