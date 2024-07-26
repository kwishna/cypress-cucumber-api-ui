@api @todos
Feature: Challenger API - Alan Richardson

    Background: Verify and set base url and challenger id
        Given I set the baseurl
        And I have the challenger id

    @rest9 @post_todo @positive
    Scenario: GET /todos (200) ? filter
            """
            Issue a GET request on the /todos end point with a query filter to get only todos which are ‘done’.
            There must exist both ‘done’ and ’not done’ todos, to pass this challenge.
            query param - '/todos?doneStatus=true'
            """
        When I fetch all the completed todos
        Then I verify all the completed todos response

    @rest10 @gettodo @negative
    Scenario: GET /todos (400) ? invalid filter
            """
            Issue a GET request to create a todo but fail validation on the doneStatus field
            """
        When I fetch all the completed todos
        Then I verify all the completed todos response
    
    @rest13 @options_todo @negative
    Scenario: OPTIONS /todos
            """
            Issue an OPTIONS request on the /todos end point.
            You might want to manually check the ‘Allow’ header in the response is as expected.
            """
        When I get all the method options for todo
        Then I verify all the completed todos response