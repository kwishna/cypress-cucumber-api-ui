@api @todos
Feature: Challenger API - Alan Richardson

    Background: Verify and set base url and challenger id
        Given I set the baseurl
        And I have the challenger id

    @rest8 @post_todo @positive
    Scenario: POST /todos (200) - Issue a POST request to successfully create a todo
        When I post an item into the Todo list
            """
            {
                "title": "create todo to learn cypress",
                "doneStatus": false,
                "description": "Learn cypress thoroughly"
            }
            """
        Then I verify the successful Todo creation response


    @rest11 @post_todo @negative
    Scenario: POST /todos (400) - Issue a POST request to successfully create a todo
        When I post an item into the Todo list
            """
            {
                "title": "create todo to learn cypress - negative",
                "doneStatus": "pending",
                "description": "Learn cypress thoroughly - negative"
            }
            """
        Then I verify the un-successful Todo creation response

    @rest12 @post_todo @positive
    Scenario: POST /todos/id (200) - Issue a POST request to successfully update a todo
        When I update an item into the Todo list
            """
            {
                "title": "update todo to learn cypress - updating"
            }
            """
        Then I verify the successful Todo updated response

    @rest13 @post_todo @positive
    Scenario: DELETE /todos/id (200) - Issue a DELETE request to successfully delete a todo
        When I delete an item in todo list at id "1"
        Then I verify the successful Todo deleted response at id "1"