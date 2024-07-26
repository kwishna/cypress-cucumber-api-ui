@api @todos
Feature: Challenger API - Alan Richardson

    Background: Verify and set base url and challenger id
        Given I set the baseurl
        And I have the challenger id

    @rest3 @get_todos @positive
    Scenario: GET /todos (200) - Issue a GET request on the /todos end point
        When I get list of all the Todo
        Then I verify the list of all the Todo

    @rest4 @get_todos @negative
    Scenario: GET /todo (404) - Issue a GET request on the /todo end point should 404 because nouns should be plural
        When I get list of the Todo from invalid endpoint
        Then I verify that no todo is returned from invalid endpoint

    @rest5 @get_todo @positive
    Scenario: GET /todos/{id} (200) - Issue a GET request on the /todos/{id} end point to return a specific todo
        When I the fetch an specific Todo
        Then I verify the specific Todo is returned

    @rest6 @get_todo @negative
    Scenario: GET /todos/{id} (404) - Issue a GET request on the /todos/{id} end point for a todo that does not exist
         When I the fetch an invalid Todo resource
        Then I verify the invalid todo resource error

    @rest7 @get_todo @positive
    Scenario: HEAD /todos/{id} (200) - Issue a HEAD request on the /todos end point
        When I make API request with following info
            """
            {
                "headers": {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "User-Agent": "cypress api client"
                },
                "url": "/todos",
                "method": "HEAD"
            }
            """
        Then I verify the API response
            """
            {}
            """
        And I verify the API response
            """
            {
                "statusCode": 200,
                "statusText": "OK",
                "duration": 5000
            }
            """
        And I verify no response body