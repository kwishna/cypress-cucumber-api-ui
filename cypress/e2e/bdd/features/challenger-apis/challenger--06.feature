@api @todos @auth
Feature: Challenger API - Auth

    Background: Verify and set base url and challenger id
        Given I set the baseurl
        And I have the challenger id

    @rest17
    Scenario: Authentication Failed - 1
        When I make API request with following info
            """
            {
                "headers": {
                    "x-challenger": "36718bf6-1bd9-4091-b6ae-4ff8a02ea020",
                    "Authorization": "Basic dXNlcjpwYXNz",
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "User-Agent": "cypress api client"
                },
                "url": "/secret/token",
                "method": "POST",
                "body": {}
            }
            """
        And I verify the failed API response
            """
            {
                "statusCode": 401,
                "statusText": "Unauthorized"
            }
            """

    @rest18
    Scenario: Authentication - 2
        When I make API request with following info
            """
            {
                "headers": {
                    "x-challenger": "f40e9a14-30b6-4816-b672-eb3ae51fc603",
                    "Authorization": "Basic YWRtaW46cGFzc3dvcmQ=",
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "User-Agent": "cypress api client"
                },
                "url": "/secret/token",
                "method": "POST"
            }
            """
        And I verify the API response
            """
            {
                "statusCode": 201,
                "statusText": "Created"
            }
            """

    @rest19
    Scenario: Authentication Failed - 3
        When I make API request with following info
            """
            {
                "headers": {
                    "x-challenger": "f40e9a14-30b6-4816-b672-eb3ae51fc603",
                    "X-AUTH-TOKEN": "bob",
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "User-Agent": "cypress api client"
                },
                "url": "/secret/note",
                "method": "GET"
            }
            """
        And I verify the failed API response
            """
            {
                "statusCode": 403,
                "statusText": "Forbidden"
            }
            """