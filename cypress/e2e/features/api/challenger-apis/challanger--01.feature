@challenger @api
Feature: Challenger API - 1

    Background: Verify and set base url and challenger id
        Given I set the baseurl

    @rest1
    Scenario: /POST challenger 201 - Issue a POST request on the /challenger end point, with no body, to create a new challenger session.
        When I register myself to challenger API at 'POST challenger'
        Then I verify the successful registeration

    @rest2
    Scenario: /GET challenges 200 - Issue a GET request on the /challenges end point
        And I have the challenger id
        When I get the list of all challenges
        Then I verify the list of all challenges