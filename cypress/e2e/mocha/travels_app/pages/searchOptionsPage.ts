export class SearchOptionsPage {
    // Locators
    searchButtons = "div.ShowSearchBox ul.nav li button";
    searchButtonSpans = "div.ShowSearchBox ul.nav li button span";

    // Expected Values
    expectedTexts = ['Flights', 'Hotels', 'Tours', 'Cars'];
}

export const searchOptionsPage = new SearchOptionsPage();