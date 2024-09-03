import moment from 'moment';
import { BaseComponent } from './base_component';

interface IPassengers {
    adults: number;
    childs: number;
    infants: number;
}

interface IOneWaySearchData {
    from: string;
    to: string;
    departDate: string;
    passengers: IPassengers;
}

interface ITwoWaySearchData extends IOneWaySearchData {
    returnDate: string;
}

export class SearchPage extends BaseComponent {
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
    resultSpan = /\d{1,3} Flights Found/;

    // Expected Values
    ALL_SEARCH_OPTIONS = ['Flights', 'Hotels', 'Tours', 'Cars'];
    ALL_PASSENGER_TYPES_LABELS = ['Adults', 'Childs', "Infants"];
    ALL_PASSENGER_AGES = ['+12 Year', '2 - 11 Year', '-2 Year'];
    ALL_FLIGHTS_TYPES = ['oneway', 'return'];

    /**
     * @description Select Search Option
     * @param option - Search Option
     */
    selectSearchOption(option: string) {
        cy.log(`Select Search Option: ${option}`);
        cy.get(this.searchOptionsButtons).contains(option).click();
    }

    /**
     * @description Select Flights Option
     * @param way - Flights Option
     */
    selectFlightsType(flightsType: 'oneway' | 'return') {
        cy.log(`Select Flights Type: ${flightsType}`);
        cy.get(`div.flight_types div input[value='${flightsType}']`).should('be.visible').check().should('be.checked');
    }

    /**
     * @description Select Origin City
     * @param originCity - Origin City
     */
    selectOriginCity(originCity: string) {
        cy.log(`Select Origin City: ${originCity}`);
        cy.get(this.flightsSearchForm)
            .within(() => {
                // cy.get(this.oneWayRadioButton).should('be.visible').click();
                cy.get(this.originCityLabel).should('have.text', 'Flying From');
                cy.get(this.originCityDropdown).should('be.visible').click();
            });

        // Enter Origin City
        cy.get("input.select2-search__field").should('exist').focus().type(originCity).should('have.value', originCity);

        // Select Origin City from dropdown
        cy.get("ul.select2-results__options#select2--results")
            .should('be.visible')
            .get("span.select2-container--open ul.select2-results__options button")
            .contains(originCity)
            .should('be.visible')
            .click();
    }

    /**
     * @description Select Destination City
     * @param destinationCity - Destination City
     */
    selectDestinationCity(destinationCity: string) {
        cy.log(`Select Destination City: ${destinationCity}`);
        cy.get(this.flightsSearchForm)
            .within(() => {
                // cy.get(this.oneWayRadioButton).should('be.visible').click();
                cy.get(this.destinationCityLabel).should('have.text', 'Destination To');
                cy.get(this.destinationCityDropdown).should('be.visible').click();
            });

        // Enter Destination City
        cy.get("input.select2-search__field").should('exist').focus().type(destinationCity).should('have.value', destinationCity);

        // Select Destination City from dropdown
        cy.get("ul.select2-results__options#select2--results")
            .should('be.visible')
            .get("span.select2-container--open ul.select2-results__options button")
            .contains(destinationCity)
            .should('be.visible')
            .click();
    }

    /**
     * @description Select Depart Date
     * @param departDate - Depart Date
     */
    selectDepartDate(departDate: string) {
        cy.log(`Select Depart Date: ${departDate}`);
        cy.get(this.flightsSearchForm)
            .within(() => {
                cy.get(this.departDateLabel).should('contain.text', 'Depart Date');
                cy.get(this.departDateInput).clear().type(departDate);
            });
    }

    /**
     * @description Select Return Date
     * @param returnDate - Return Date
     */
    selectReturnDate(returnDate: string) {
        cy.log(`Select Return Date: ${returnDate}`);
        cy.get(this.flightsSearchForm)
            .within(() => {
                cy.get(this.returnDateLabel).should('contain.text', 'Return Date');
                cy.get(this.returnDateInput).clear().type(returnDate);
            });
    }

    /**
     * @description Verify Passenger Types
     */
    verifyPassengerTypes() {
        cy.log(`Verify Passenger Types`);
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

    /**
     * @description Select Passengers
     * @param passengers - Passengers Object
     */
    selectPassengers(passengers: IPassengers = { adults: 1, childs: 0, infants: 0 }) {
        cy.log(`Select Passengers`);
        cy.get(this.passengersTypesLabel)
            .then(($els) => {
                const adults = $els.eq(0);
                const isAdultsVisible = adults.is(':visible');

                if (!isAdultsVisible) {
                    cy.get(this.flightsSearchForm).find(this.passengersTypesLabel).should('be.visible').click();
                }
                else {
                    Object.keys(passengers).forEach(key => {
                        cy.get("a.dropdown-btn.travellers + div.dropdown-menu")
                            .filter(':visible')
                            .should('have.length', 1)
                            // .should('be.visible')
                            .within(() => {
                                cy.get('label strong')
                                    .contains(key, { matchCase: false })
                                    .parent('label')
                                    .siblings('div')
                                    // .siblings('div.qtyBtn')
                                    // .should('be.visible')
                                    .find('input.qtyInput_flights')
                                    .clear()
                                    .type(passengers[key].toString())
                                    .blur()
                                    .should('have.value', passengers[key].toString());
                            })
                    })
                }
            });
    }

    /**
     * @description Submit Flight Search
     */
    submitFlightSearch() {
        cy.log(`Submit Flight Search`);
        cy.get(this.submitButton).should('be.visible').click();
        // cy.waitForElementToDisappear('div.loading_home');
        // cy.get('div.loading_home').should('not.exist');
        this.waitForElementToNotBeVisible(this.loader, 20000, 500);
    }

    /**
     * @description Fill One Way Flight Form
     * @param from - Origin City
     * @param to - Destination City
     * @param depart - Depart Date
     * @param passengers - Passengers Object
     */
    fillOneWayFlightForm(searchData: IOneWaySearchData) {
        cy.log(`Fill One Way Flight Form`);

        // Open Select origin dropdown
        this.selectOriginCity(searchData.from);

        // Open Destination dropdown
        this.selectDestinationCity(searchData.to);

        // Enter Depart Date
        this.selectDepartDate(searchData.departDate);

        // Verify Travellers
        this.verifyPassengerTypes();

        // Select Passengers
        this.selectPassengers(searchData.passengers);
    }

    /**
     * @description Fill Two Way Flight Form
     * @param from - Origin City
     * @param to - Destination City
     * @param departDate - Depart Date
     * @param returnDate - Return Date
     * @param passengers - Passengers Object    
     */
    fillTwoWayFlightForm(searchData: ITwoWaySearchData) {
        cy.log(`Fill Two Way Flight Form`);

        // Open Select origin dropdown
        this.selectOriginCity(searchData.from);

        // Open Destination dropdown
        this.selectDestinationCity(searchData.to);

        // Enter Depart Date
        this.selectDepartDate(searchData.departDate);

        // Enter Return Date
        this.selectReturnDate(searchData.returnDate);

        // Verify Travellers
        this.verifyPassengerTypes();

        // Select Passengers
        this.selectPassengers(searchData.passengers);
    }
}

export const searchPage = new SearchPage();