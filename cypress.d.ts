/// <reference types="@cypress/xpath" />
/// <reference types="cypress" />
/// <reference types="cypress-wait-until" />
/// <reference types="cypress-plugin-api" />
/// <reference types="cypress-plugin-api" />
interface CustomWorld {
    params: Record<string, any>;
}

declare namespace Mocha {
    interface Context extends CustomWorld { }
}

type WaitUntilLogger = Pick<Cypress.LogConfig, 'name' | 'message' | 'consoleProps'>

type ErrorMsgCallbacks<Subject = any> = (
    result: Subject,
    options: WaitUntilOptions<Subject>
) => string

interface WaitUntilOptions<Subject = any> {
    timeout?: number
    interval?: number
    errorMsg?: string | ErrorMsgCallbacks<Subject>
    description?: string
    customMessage?: string
    verbose?: boolean
    customCheckMessage?: string
    logger?: (logOptions: WaitUntilLogger) => any
    log?: boolean
}

declare namespace Cypress {
    interface Chainable<Subject = any> {
        waitUntil<ReturnType = any>(
            checkFunction: (
                subject: Subject | undefined
            ) => ReturnType | Chainable<ReturnType> | Promise<ReturnType>,
            options?: WaitUntilOptions<Subject>
        ): Chainable<ReturnType>

        /**
         * Custom command to type a few random words into input elements
         * @param count=3
         * @example cy.get('input').typeRandomWords()
         */
        typeRandomWords(
            count?: number,
            options?: Partial<TypeOptions>
        ): Chainable<JQuery<HTMLElement>>

        frame(selector: string): Cypress.Chainable<unknown>
        mouseOver(selector: string): Cypress.Chainable<JQuery<any>>
        assertList(subject: Array<JQuery<HTMLElement>>, expected: Array<string>): Cypress.Chainable<Subject>
        tab(options?: Partial<{shift: Boolean}>): Chainable
        cucumberLog(data: string, mediaType: string): void
        schemaValidate(body: any, schema: any): void
    }
}