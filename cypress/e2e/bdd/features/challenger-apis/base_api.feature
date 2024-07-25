@api @todos
Feature: Challenger API - Alan Richardson

    Background: Verify and set base url and challenger id
        Given I set the baseurl
        And I have the challenger id

    @rest3 @get_todos
    Scenario: GET /todos (200) - Get all Todos
        When I make API request with following info
        """
        {
            "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "User-Agent": "cypress api client"
            },
            "url": "/todos",
            "method": "GET"
        }
        """
        Then I verify the API response
        """
        {
        }
        """
        And I verify the API response
        """
        {
            "statusCode": 200,
            "statusText": "OK",
            "duration": 5000
        }
        """