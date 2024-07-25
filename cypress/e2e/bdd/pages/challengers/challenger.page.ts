import { BaseApi, MyApiResponse } from "../base.page";

export class ChallengerApi extends BaseApi {

    static registerToChallengerApi() {
        //  405 - Method not allowed - When made /GET request on creation endpoint.
        cy.api({
            url: "/challenger",
            method: "POST",
            headers: {
                "Accept": "*/*",
                "Content-Type": "text/html;charset=utf-8;application/json"
            },
            body: {}
        }).as("registeration")
    }

    static verifyChallengerApiRegisteration() {
        cy.get("@registeration")
            .then((res) => {
                // @ts-ignore
                return cy.wrap(res) as MyApiResponse;
            })
            .then((res) => {
                expect(res.status).to.equal(201);
                expect(res.statusText).to.equal("Created");

                const challenger_id = res.headers['x-challenger']; // 56b17eb2-f426-4a96-8d51-1456f3de60db
                cy.log(`challenger id: ${challenger_id}`)

                expect(challenger_id).to.not.eq(undefined);
                Cypress.env("X-CHALLENGER", challenger_id);
            })
    }

    static getAllChallenges(challenger_id: string) {
        // 404 - Not Found error - When provided unregistered user_id in challenger api
        cy.api({
            url: "/challenges",
            method: "GET",
            headers: {
                "X-CHALLENGER": challenger_id,
                "Accept": "*/*",
                "Content-Type": "text/html;charset=utf-8;application/json"
            },
            body: {}
        }).as("list_of_challenges")
    }

    static verifyListOfChallanges() {
        cy.get("@list_of_challenges")
            // @ts-ignore
            .then((res) => {
                // @ts-ignore
                return cy.wrap(res) as MyApiResponse;
            })
            .then((res) => {
                cy.log(`[DEBUG] Verifying list of challenges status!`)

                expect(res.status).to.eq(200);
                expect(res.statusText).to.eq('OK');

                expect(res.body).to.have.property('challenges');
                expect(res.body.challenges).to.have.length.gte(2);

                // for (const challenge of res.body.challenges) {
                //     expect(challenge).to.have.property('name');
                //     expect(challenge).to.have.property('description');
                //     expect(challenge).to.have.property('status');

                //     expect(challenge.name).to.not.equal(undefined).and.not.equal("").and.not.be.empty;
                //     expect(challenge.description).to.not.equal(undefined).and.not.equal("").and.not.be.empty;
                //     expect(challenge.status).to.be.a('boolean').and.not.equal(undefined);
                // }

                for (let i = 0; i < 5; i++) {
                    const challenge = res.body.challenges[i];
                    expect(challenge).to.have.property('name');
                    expect(challenge).to.have.property('description');
                    expect(challenge).to.have.property('status');

                    expect(challenge.name).to.not.equal(undefined).and.not.equal("").and.not.be.empty;
                    expect(challenge.description).to.not.equal(undefined).and.not.equal("").and.not.be.empty;
                    expect(challenge.status).to.be.a('boolean').and.not.equal(undefined);
                }
            })
    }
}