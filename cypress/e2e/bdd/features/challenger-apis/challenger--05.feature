@api @todos
Feature: Challenger API - Alan Richardson

    Background: Verify and set base url and challenger id
        Given I set the baseurl
        And I have the challenger id

    @rest14 @get_todo @positive
    Scenario: GET /todos (200) XML
        When I fetch all the todos in XML format

    @rest15 @get_todo @negative
    Scenario: GET /todos (406) - Invalid Accept Header - Not Acceptable
        When I make API request with following info
        """
        {
            "headers": {
                "Accept": "application/gzip",
                "Content-Type": "application/json",
                "User-Agent": "cypress api client"
            },
            "url": "/todos",
            "method": "GET"
        }
        """
        And I verify the failed API response
        """
        {
            "statusCode": 406,
            "statusText": "Not Acceptable",
            "duration": 5000,
            "errorMsg": "Unrecognised Accept Type"
        }
        """

    @rest16 @post_todo @negative
    Scenario: POST /todos (415) - Unsupported Content Type
        When I make API request with following info
        """
        {
            "headers": {
                "x-challenger": "36718bf6-1bd9-4091-b6ae-4ff8a02ea020",
                "Accept": "*/*",
                "Content-Type": "marvel",
                "User-Agent": "cypress api client"
            },
            "url": "/todos",
            "method": "POST",
            "body": { "title": "create marvel movie", "doneStatus": false, "description": "I am Cameron" }
        }
        """
        And I verify the failed API response
        """
        {
            "statusCode": 415,
            "statusText": "Unsupported Media Type",
            "duration": 5000,
            "errorMsg": "Unsupported Content Type"
        }
        """