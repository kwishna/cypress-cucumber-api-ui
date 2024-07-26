// import { JSONPath } from "jsonpath-plus"
import { BaseApi, MyApiResponse } from "../base.page";

/**
 * @description Todos page.
 */
export class Todos extends BaseApi {
    static getAllTodos(challenger_id: string) {
        cy.request({
            url: "/todos",
            method: "GET",
            headers: {
                "X-CHALLENGER": challenger_id,
                "Accept": "application/json",
                "Contentt-Type": "application/json",
                "User-Agent": "cypress api client"
            }
        }).as("allTodos")
    }

    static verifyListOfAllTodos() {
        cy.get("@allTodos")
            // @ts-ignore
            .then((response) => cy.wrap(response) as MyApiResponse)
            .then((res) => {
                expect(res.status).to.equal(200, 'Get todo status code');
                expect(res.statusText).to.equal('OK', 'Get todo status text');
                expect(res.headers['content-type']).to.equal('application/json', 'Get todo content type.');
            })
            .then((res) => {
                cy.fixture('todoSchema').then((schema) => {
                    const [isValid, error] = BaseApi.validateSchema(schema, res.body);
                    expect(isValid).to.equal(true, `Get todo schema validation. Error: ${error}`);
                });
            });
    }

    static getTodosFromInvalidEndpoint(challenger_id: string) {
        cy.request({
            url: "/todo",
            method: "GET",
            headers: {
                "X-CHALLENGER": challenger_id,
                "Accept": "application/json",
                "Contentt-Type": "application/json",
                "User-Agent": "cypress api client"
            },
            failOnStatusCode: false
        }).as("allTodos")
    }

    static verifyNoTodoErrorResponse() {
        cy.get("@allTodos")
            // @ts-ignore
            .then((response) => cy.wrap(response) as MyApiResponse)
            .then((res) => {
                cy.wrap(res).its('status').should('equal', 404, 'Get todo status code');
                cy.wrap(res).its('statusText').should('equal', 'Not Found');
                cy.wrap(res).its('headers').its('content-type').should('equal', 'application/json');
                cy.wrap(res).its('body.errorMessages').its(0).should('equal', '404 resource Unknown');

                // cy.wrap(res).its('status').better('equal', 404, 'Get todo status code');
                // cy.wrap(res).its('statusText').better('equal', 'Not Found');
                // cy.wrap(res).its('headers').its('content-type').better('equal', 'application/json');
            });
    }

    static fetchAnSpecificTodo(challenger_id: string) {
        const todoNo: number = 1;
        cy.api({
            url: `/todos/${1}`,
            method: "GET",
            headers: {
                "X-CHALLENGER": challenger_id,
                "Accept": "application/json",
                "Contentt-Type": "application/json",
                "User-Agent": "cypress api client"
            },
            failOnStatusCode: false
        }).as("singleTodo")
    }

    static verifySpecificTodoIsReturned() {
        cy.get("@singleTodo")
            // @ts-ignore
            .then((response) => cy.wrap(response) as MyApiResponse)
            .then((res) => {
                cy.wrap(res).its('status').should('equal', 200, 'Get todo status code');
                cy.wrap(res).its('statusText').should('equal', 'OK');
                cy.wrap(res).its('headers').its('content-type').should('equal', 'application/json');

                cy.wrap(res).its('body').its('todos').should('have.length.at.least', 1);

                cy.wrap(res).its('body').its('todos[1]').should('be.undefined');

                cy.wrap(res).its('body').its('todos[0].id').should('be.a', 'number');
                cy.wrap(res).its('body').its('todos[0].title').should('be.a', 'string');
                cy.wrap(res).its('body').its('todos[0].doneStatus').should('be.a', 'boolean');
                cy.wrap(res).its('body').its('todos[0].description').should('be.a', 'string');

            });
    }

    static fetchInvalidTodoResource(challenger_id: string) {
        const todoNo: number = Math.floor(Math.random() * 999999999999);
        cy.api({
            url: `/todos/${todoNo}`,
            method: "GET",
            headers: {
                "X-CHALLENGER": challenger_id,
                "Accept": "application/json",
                "Contentt-Type": "application/json",
                "User-Agent": "cypress api client"
            },
            failOnStatusCode: false
        }).as("invalidTodo")
    }

    static verifyInvalidTodoResource() {
        cy.get("@invalidTodo")
            // @ts-ignore
            .then((response) => cy.wrap(response) as MyApiResponse)
            .then((res) => {
                cy.wrap(res).its('status').should('equal', 404, 'Get todo status code');
                cy.wrap(res).its('statusText').should('equal', 'Not Found');
                cy.wrap(res).its('headers').its('content-type').should('equal', 'application/json');
                cy.wrap(res).its('body.errorMessages').its(0).should('contain', 'Could not find an instance with todos');
            });
    }

    static postItemIntoTodo(challenger_id: string, todoItem: { title: string, description: string, doneStatus: boolean }) {
        cy.api({
            url: "/todos",
            method: "POST",
            failOnStatusCode: false,
            body: todoItem,
            headers: {
                "X-CHALLENGER": challenger_id,
                "Accept": "application/json",
                "Contentt-Type": "application/json",
                "User-Agent": "cypress api client"
            },
        }).as("createdTodo");
    }

    static verifyTodoItemCreated() {
        // 400 Bad request error - if more than 20 requests are sent. Limit = 20;
        cy.get("@createdTodo")
            // @ts-ignore
            .then((response) => response as MyApiResponse)
            .then((res) => {
                cy.wrap(res).its('status').should('equal', 201);
                cy.wrap(res).its('statusText').should('equal', 'Created');

                cy.wrap(res).its('body').should('not.be.an', 'undefined', "Body must not be undefined");
                cy.wrap(res).its('body').its('id').should('be.a', 'number', "body.id must be a number");
                cy.wrap(res).its('body').its('title').should('be.a', 'string', "body.title must be a number");
                cy.wrap(res).its('body').its('doneStatus').should('be.a', 'boolean', "body.doneStatus must be a boolean");
                cy.wrap(res).its('body').its('description').should('be.a', 'string', "body.description must be a string");

                // cy.log(res.body.id)
                cy.wrap(res.body.id).as("createdTodoId");
            });
    }

    static verifyTodoItemCreationFailure() {
        cy.get("@createdTodo")
            // @ts-ignore
            .then((response) => response as MyApiResponse)
            .then((res) => {
                cy.wrap(res).its('status').should('equal', 400);
                cy.wrap(res).its('statusText').should('equal', 'Bad Request');

                cy.wrap(res).its('headers').its('content-type').should('equal', 'application/json');
                cy.wrap(res).its('body.errorMessages').its(0).should('contain', "Failed Validation: doneStatus should be BOOLEAN");
            });
    }

    static fetchAllCompletedTodos(challenger_id: string) {
        const doneStatus: boolean = false;
        cy.api({
            failOnStatusCode: false,
            method: "GET",
            url: `/todos?doneStatus=${doneStatus}`,
            headers: {
                "X-CHALLENGER": challenger_id,
                "Accept": "application/json",
                "Contentt-Type": "application/json",
                "User-Agent": "cypress api client"
            }
        }).as("filteredTodo")
    }

    static verifyAllCompletedTodo() {
        cy.get("@filteredTodo")
            // @ts-ignore
            .then(response => cy.wrap(response) as MyApiResponse)
            .then(res => {
                cy.wrap(res).its('status').should('equal', 200);
                cy.wrap(res).its('statusText').should('equal', 'OK');
                cy.wrap(res).its('body.todos').should('be.an', 'array', "Body must not be undefined");

                expect(res.body.todos).to.have.length.gte(1);

                // console.log(JSONPath({ json: res.body, path: "$.todos[?(@.doneStatus == false)]" }));


                for (let i = 0; i < 5; i++) {
                    const todos = res.body.todos[i];
                    expect(todos).to.have.property('id');
                    expect(todos).to.have.property('title');
                    expect(todos).to.have.property('description');
                    expect(todos).to.have.property('doneStatus');

                    expect(todos.id).to.be.a("number");
                    expect(todos.title).to.be.an("string");
                    expect(todos.description).to.be.an("string");
                    expect(todos.doneStatus).to.be.a('boolean');
                }
            });
    }

    static updateItemInTodoList(challenger_id: string, todoId: number, body) {
        cy.api({
            failOnStatusCode: false,
            method: "POST",
            url: `/todos/${todoId}`,
            headers: {
                "X-CHALLENGER": challenger_id,
                "Accept": "application/json",
                "Contentt-Type": "application/json",
                "User-Agent": "cypress api client"
            },
            body: body
        }).as("updatedTodo")
    }

    static verifyTodoItemUpdated() {
        cy.get("@updatedTodo")
            // @ts-ignore
            .then((response) => response as MyApiResponse)
            .then((res) => {
                cy.wrap(res).its('status').should('equal', 200);
                cy.wrap(res).its('statusText').should('equal', 'OK');

                cy.wrap(res).its('body').should('not.be.an', 'undefined', "Body must not be undefined");
                cy.wrap(res).its('body').its('id').should('be.a', 'number', "body.id must be a number");
                cy.wrap(res).its('body').its('title').should('be.a', 'string', "body.title must be a number");
                cy.wrap(res).its('body').its('doneStatus').should('be.a', 'boolean', "body.doneStatus must be a boolean");
                cy.wrap(res).its('body').its('description').should('be.a', 'string', "body.description must be a string");

                cy.wrap(res).its('body').its('title').should('equal', "update todo to learn cypress - updating");
            });
    }

    static deleteItemInTodoList(challenger_id: string, todoId: number) {
        cy.api({
            failOnStatusCode: false,
            method: "DELETE",
            url: `/todos/${todoId}`,
            headers: {
                "X-CHALLENGER": challenger_id,
                "Accept": "application/json",
                "Contentt-Type": "application/json",
                "User-Agent": "cypress api client"
            }
        }).as("deletedTodo")
    }

    static verifyTodoItemDeleted(challenger_id: string, todoId: number) {
        cy.get("@deletedTodo")
            // @ts-ignore
            .then((response) => response as MyApiResponse)
            .then((res) => {
                cy.wrap(res).its('status').should('equal', 200);
                cy.wrap(res).its('statusText').should('equal', 'OK');
                cy.wrap(res).its('body').should('not.be', 'undefined', "Body must be undefined");
            }).then(() => {
                Todos.verifyDeleteItemNotFound(challenger_id, todoId);
            })
    }

    static verifyDeleteItemNotFound(challenger_id: string, todoId: number) {
        cy.api({
            failOnStatusCode: false,
            method: "GET",
            url: `/todos/${todoId}`,
            headers: {
                "X-CHALLENGER": challenger_id,
                "Accept": "application/json",
                "Contentt-Type": "application/json",
                "User-Agent": "cypress api client"
            }
        }).then((res) => {
            cy.wrap(res).its('status').should('equal', 404);
            cy.wrap(res).its('statusText').should('equal', 'Not Found');
            cy.wrap(res).its('body.errorMessages[0]').should('contain', 'Could not find an instance with todos');
        });
    }

    static getAllTodoOptionMethods() {
        cy.api({
            method: 'OPTIONS',
            url: "/todos",
            headers: {
                'Accept': "*/*",
                'Content-Type': "application/json",
                "X-challenger": Cypress.env("X-CHALLENGER")
            }
        }).then(res => {
            cy.wrap(res).its("status").should("eq", 200);
            cy.wrap(res).its("statusText").should("eq", "OK");
            cy.wrap(res).its("headers['Allow']").should("contain", "OPTIONS");
            cy.wrap(res).its("headers['Allow']").should("contain", "GET,");
            cy.wrap(res).its("headers['Allow']").should("contain", "HEAD");
            cy.wrap(res).its("headers['Allow']").should("contain", "POST");
        })
    }

    static getAllTodosInXmlFormat() {
        cy.api({
            method: 'GET',
            url: "/todos",
            headers: {
                'Accept': "application/xml",
                'Content-Type': "application/json",
                "X-challenger": Cypress.env("X-CHALLENGER")
            }
        }).then(res => {
            cy.wrap(res).its("status").should("eq", 200);
            cy.wrap(res).its("statusText").should("eq", "OK");
            cy.wrap(res).its("headers['content-type']").should("eq", "application/xml");
            cy.task("xmlToJs", res.body).then((r) => {
                // @ts-ignore
                // cy.log(JSON.stringify(r.todos.todo, null, 2))
                // @ts-ignore
                const filteredData = Cypress._.filter(r.todos.todo, { id: "10" });
                expect(filteredData).to.have.length.gte(1);
                cy.wrap(r).its('todos').its('todo').should('have.length.gte', 1);
            });
        });
    }
}