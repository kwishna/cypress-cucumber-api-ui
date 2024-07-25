import Ajv, { ErrorObject } from 'ajv';
import addFormats from 'ajv-formats';

import { ApiResponseBody } from "cypress-plugin-api";
export type MyApiResponse = Cypress.Chainable<ApiResponseBody>;

// cy.api({
//     url: "string only",
//     encoding: "utf-8",
//     failOnStatusCode: false,
//     followRedirect: false,
//     gzip: false,
//     log: true,
//     qs: {
//         "status": true
//     },
//     headers: {},
//     timeout: 5000,
//     retryOnNetworkFailure: true,
//     retryOnStatusCodeFailure: true,
//     body: {},
//     /*
//     request.get('http://some.server.com/').auth('username', 'password', false);
    
//     // or
//     request.get('http://some.server.com/', {
//     'auth': {
//         'user': 'username',
//         'pass': 'password',
//         'sendImmediately': false
//     }
//     });
//     // or
//     request.get('http://some.server.com/').auth(null, null, true, 'bearerToken');
    
//     // or
//     request.get('http://some.server.com/', {
//     'auth': {
//         'bearer': 'bearerToken'
//     }
//     });
//     */
//     method: "GET",
//     form: false
// })

/**
 * @description Base class for all the api pages.
 */
export class BaseApi {

    /**
     * ```info
     * Schema validation is important while testing APIs for several key reasons:-
     *  Data consistency: It ensures that the data being sent and received from the API is consistent and predictable, reducing the risk of errors and inconsistencies.
     *  Data integrity: It ensures that the data structure and types conform to what the API expects, preventing issues caused by malformed or incorrect data.
     *  Contract enforcement: It helps enforce the agreed-upon contract between the API provider and consumers, ensuring consistency in data exchange.
     *  Early error detection: Validation can catch issues early in the development process, before they cause problems in production environments.
     *  Security: It can help prevent injection attacks and other security vulnerabilities by ensuring that incoming data meets expected formats and constraints.
     *  Documentation: The schema serves as a form of documentation, clearly defining the expected structure of requests and responses.
     *  Automated testing: Schema validation can be easily integrated into automated testing processes, allowing for quick and consistent verification of API inputs and outputs.
     *  Versioning support: As APIs evolve, schema validation helps manage version changes and ensures backward compatibility.
     *  Reduced debugging time: By catching format and type errors early, it saves time that would otherwise be spent debugging issues caused by incorrect data structures.
     *  Improved API reliability: Consistent data structures lead to more reliable API behavior and fewer runtime errors.
     *  Client-side validation: Schemas can be shared with API consumers, allowing them to implement client-side validation for better user experience and reduced server load.
     * ```
     * @description Validate the schema of the response.
     * @param schema schema in the object form. use `JSON.parse(schema)` to convert the schema to object. (if required)
     * @param data data to be validated. Mostly, it's the response body.
     * @returns {boolean} true if the schema is valid, false otherwise.
     * @returns {string} error message if the schema is invalid.
     */
    static validateSchema(schema, data): [boolean, string] {
        const ajv = new Ajv({
            allErrors: true,
            verbose: true,
            strict: true,
        });
        addFormats(ajv);

        const validate = ajv.compile(schema);
        const isValid = validate(data);

        let errorMessages: string = null;
        if (!isValid) {
            const errors: ErrorObject[] = validate.errors;
            errorMessages = errors.map(error => `${error.data} ${error.message}`).join(', ');
            cy.log(`Schema validation failed. Errors: ${errorMessages}`);
        }
        return [isValid, errorMessages];
    };

    /**
     * @description Make an api call.
     * @param reqInfo request information.
     */
    static makeApiCall(reqInfo: { "headers": any, "url": string, "method": string, "body": any }) {
        const { url, method, headers, body, ...args } = reqInfo;
        cy.api({
            url,
            method,
            body: body,
            headers,
            failOnStatusCode: false
        }).as("response");
    }

    /**
     * @description Verify the response.
     * @param respInfo response information.
     */
    static verifySuccessfulResponse(respInfo?: { statusCode?: number, statusText?: string, duration?: number, errorMsg?: string }) {
        cy.get("@response")
            // @ts-ignore
            .then((response) => cy.wrap(response) as MyApiResponse)
            .then((res) => {
                expect(res.status).to.be.within(200, 299, "Response status shows failure.");
                if (respInfo?.statusCode) {
                    expect(res.status).to.equal(respInfo?.statusCode, `API response status code`);
                }
                if (respInfo?.statusText) {
                    expect(res.statusText).to.equal(respInfo?.statusText, `API response status line text`);
                }
                if (respInfo?.duration) {
                    expect(res.duration).to.be.lte(respInfo?.duration, `API response duration`);
                }
                if (respInfo?.errorMsg) {
                    expect(res.body.errorMessages).to.include(respInfo?.errorMsg, `API response error message`);
                }
            });
    }

    /**
     * @description Verify the response.
     * @param respInfo response information.
     */
    static verifyFailedResponse(respInfo?: { statusCode?: number, statusText?: string, duration?: number, errorMsg?: string }) {
        cy.get("@response")
            // @ts-ignore
            .then((response) => cy.wrap(response) as MyApiResponse)
            .then((res) => {
                expect(res.status).to.not.be.within(200, 299, "Response status shows failure.");
                if (respInfo?.statusCode) {
                    expect(res.status).to.equal(respInfo?.statusCode, `API response status code`);
                }
                if (respInfo?.statusText) {
                    expect(res.statusText).to.equal(respInfo?.statusText, `API response status line text`);
                }
                if (respInfo?.duration) {
                    expect(res.duration).to.be.lte(respInfo?.duration, `API response duration`);
                }
                if (respInfo?.errorMsg) {
                    expect(res.body.errorMessages[0]).to.include(respInfo?.errorMsg, `API response error message`);
                }
            });
    }

    static verifyBlankResponseBody() {
        cy.get("@response")
            // @ts-ignore
            .then((response) => cy.wrap(response) as MyApiResponse)
            .then((res) => {
                cy.wrap(res).its('body').should('be.undefined')
            });
    }
}