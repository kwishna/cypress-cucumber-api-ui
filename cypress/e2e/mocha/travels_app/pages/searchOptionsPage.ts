import moment from 'moment';

export class SearchOptionsPage {
    // Locators
    flightsSearchForm = "form#flights-search";
    searchOptionsButtons = "div.ShowSearchBox ul.nav li button";
    searchOptionSpans = "div.ShowSearchBox ul.nav li button span";
    oneWayRadioButton = "input#one-way[type='radio']";
    originCityLabel = "select[name='city'].origin ~ label";
    originCityDropdown = "select[name='city'].origin + span span[title='Select City']";
    destinationCityLabel = "select[name='city'].destination ~ label";
    destinationCityDropdown = "select[name='city'].destination + span span[title='Select City']";
    departDateLabel = "input#departure + label";
    departDateInput = "input#departure";
    returnDateLabel = "input#return_date + label";
    returnDateInput = "input#return_date";
    travellersLabel = "a.dropdown-btn.travellers";
    passengersTypesLabel = "a.dropdown-btn.travellers + div.dropdown-menu label strong";
    submitButton = "button#flights-search[type='submit']";
    resultSpan = /\d{2,3} Flights Found/;

    // Expected Values
    ALL_SEARCH_OPTIONS = ['Flights', 'Hotels', 'Tours', 'Cars'];
    ALL_PASSENGER_TYPES_LABELS = ['Adults', 'Childs', "Infants"];
    ALL_PASSENGER_AGES = ['+12 Year', '2 - 11 Year', '-2 Year'];

    selectSearchOption(option: string) {
        cy.get(this.searchOptionsButtons).contains(option).click();
    }

    selectOriginCity(originCity: string) {
        cy.get(this.flightsSearchForm)
            .within(() => {
                cy.get(this.oneWayRadioButton).should('be.visible').click();
                cy.get(this.originCityLabel).should('have.text', 'Flying From');
                cy.get(this.originCityDropdown).should('be.visible').click();
            });

        // Select Origin City from dropdown
        cy.get("ul.select2-results__options#select2--results")
            .should('be.visible')
            .get("span.select2-container--open ul.select2-results__options div button")
            .contains(originCity)
            .should('be.visible')
            .click();
    }

    selectDestinationCity(destinationCity: string) {
        cy.get(this.flightsSearchForm)
            .within(() => {
                cy.get(this.oneWayRadioButton).should('be.visible').click();
                cy.get(this.destinationCityLabel).should('have.text', 'Destination To');
                cy.get(this.destinationCityDropdown).should('be.visible').click();
            });

        // Select Destination City from dropdown
        cy.get("ul.select2-results__options#select2--results")
            .should('be.visible')
            .get("span.select2-container--open ul.select2-results__options div button")
            .contains(destinationCity)
            .should('be.visible')
            .click();
    }

    selectDepartDate(departDate: string) {
        cy.get(this.flightsSearchForm)
            .within(() => {
                cy.get(this.departDateLabel).should('contain.text', 'Depart Date');
                cy.get(this.departDateInput).clear().type(departDate);
            });
    }

    selectReturnDate(returnDate: string) {
        cy.get(this.flightsSearchForm)
            .within(() => {
                cy.get(this.returnDateLabel).should('contain.text', 'Return Date');
                cy.get(this.returnDateInput).clear().type(returnDate);
            });
    }

    verifyPassengerTypes() {
        // Open Travellers dropdown
        cy.get(this.flightsSearchForm).find(this.travellersLabel).should('be.visible').click();

        // Verify Traveller Options
        cy.get(this.passengersTypesLabel)
            .should('be.visible')
            .each(($el, i, $els) => {
                expect($el.text()).to.equal(this.ALL_PASSENGER_TYPES_LABELS[i]);
                expect(Cypress.$($el).siblings('small').text()).to.equal(this.ALL_PASSENGER_AGES[i]);
            })

    }

    submitFlightSearch() {
        cy.get(this.submitButton).should('be.visible').click();
        cy.get('h2 span').contains(this.resultSpan, { timeout: 15000 }).should('be.visible');
    }

    fillOneWayFlightForm(from: string = 'LHE', to: string = 'DXB', depart: string = `${moment().add(1, 'days').format('DD-MM-YYYY')}`) {

        // Open Select origin dropdown
        this.selectOriginCity(from);

        // Open Destination dropdown
        this.selectDestinationCity(to);

        // Enter Depart Date
        this.selectDepartDate(depart);

        // Verify Travellers
        this.verifyPassengerTypes();

        // Submit Flight Search
        this.submitFlightSearch();
    }

    fillTwoWayFlightForm(from: string = 'LHE', to: string = 'DXB', departDate: string = `${moment().add(1, 'days').format('DD-MM-YYYY')}`, returnDate: string = `${moment().add(2, 'days').format('DD-MM-YYYY')}`) {

        // Open Select origin dropdown
        this.selectOriginCity(from);

        // Open Destination dropdown
        this.selectDestinationCity(to);

        // Enter Depart Date
        this.selectDepartDate(departDate);

        // Enter Return Date
        this.selectReturnDate(returnDate);

        // Verify Travellers
        this.verifyPassengerTypes();

        // Submit Flight Search
        this.submitFlightSearch();
    }
}

export const searchOptionsPage = new SearchOptionsPage();