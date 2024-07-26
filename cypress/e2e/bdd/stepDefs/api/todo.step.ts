import { DataTable, Given, When, Then, Step, attach } from '@badeball/cypress-cucumber-preprocessor';
import { Todos } from '../../pages/todos/todos.page';

When("I get list of all the Todo", function () {
    Todos.getAllTodos(Cypress.env("X-CHALLENGER"));
});

Then("I verify the list of all the Todo", function () {
    Todos.verifyListOfAllTodos();
});

When("I get list of the Todo from invalid endpoint", function () {
    Todos.getTodosFromInvalidEndpoint(Cypress.env("X-CHALLENGER"));
});

Then("I verify that no todo is returned from invalid endpoint", function () {
    Todos.verifyNoTodoErrorResponse();
});

When("I the fetch an specific Todo", function () {
    Todos.fetchAnSpecificTodo(Cypress.env("X-CHALLENGER"));
});

Then("I verify the specific Todo is returned", function () {
    Todos.verifySpecificTodoIsReturned();
});

When("I the fetch an invalid Todo resource", function () {
    Todos.fetchInvalidTodoResource(Cypress.env("X-CHALLENGER"));
});

Then("I verify the invalid todo resource error", function () {
    Todos.verifyInvalidTodoResource();
});

When("I post an item into the Todo list", function (this, docString: string) {
    const create_todo_body = JSON.parse(docString);
    this.test['create_todo_body'] = create_todo_body;

    Todos.postItemIntoTodo(Cypress.env("X-CHALLENGER"), create_todo_body);
});

Then("I verify the successful Todo creation response", function () {
    Todos.verifyTodoItemCreated();
});

Then("I verify the un-successful Todo creation response", function () {
    Todos.verifyTodoItemCreationFailure();
});

Then("I verify the successful Todo updated response", function () {
    Todos.verifyTodoItemUpdated();
});

When("I fetch all the completed todos", function () {
    Todos.fetchAllCompletedTodos(Cypress.env("X-CHALLENGER"));
});

Then("I verify all the completed todos response", function () {
    Todos.verifyAllCompletedTodo();
});

When("I update an item into the Todo list", function (this, docString: string) {
    Todos.updateItemInTodoList(Cypress.env("X-CHALLENGER"), 7, JSON.parse(docString));
});

When("I delete an item in todo list at id {string}", function (this, id: string) {
    Todos.deleteItemInTodoList(Cypress.env("X-CHALLENGER"), +id);
});

Then("I verify the successful Todo deleted response at id {string}", function (this, id: string) {
    Todos.verifyTodoItemDeleted(Cypress.env("X-CHALLENGER"), +id);
});

Then("I get all the method options for todo", function() {
    Todos.getAllTodoOptionMethods();
})

Then("I fetch all the todos in XML format", function() {
    Todos.getAllTodosInXmlFormat();
});
