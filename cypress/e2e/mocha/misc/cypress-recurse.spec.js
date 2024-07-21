/// <reference types="cypress" />
import { recurse } from "cypress-recurse";
describe("Calendar Validations", () => {
  it("select a date", () => {
    cy.visit("/");
    cy.get("#datepicker").click();
    cy.contains("[data-handler='selectDay'] a", "25").click();
  });

  it("Select date based on month", () => {
    cy.visit("/");
    cy.get("#datepicker").click();
    recurse(
      () => cy.get(".ui-datepicker-month").invoke("text"),
      (n) => {
        if (!n.includes("December")) {
          cy.get("[title='Next']").click();
          return false;
        }
        cy.contains("[data-handler='selectDay'] a", "24").click();
        return true;
      },
      {
        limit: 12,
      }
    );
  });
});