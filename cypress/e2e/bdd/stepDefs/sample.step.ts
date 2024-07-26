/// <reference types="../../../../cypress.d.ts" />
/// <reference types="../../../../node_modules/cypress-mochawesome-reporter" />

import { DataTable, After, AfterAll, AfterStep, Before, BeforeAll, BeforeStep, Given, When, Then, Step, attach } from '@badeball/cypress-cucumber-preprocessor';
import { epic, attachment, parameter } from "allure-js-commons";
import { Severity } from 'allure-cypress';
import * as allure from 'allure-cypress';
Given("user is logged in", function (this: CustomWorld) {
    allure.owner("John Doe");
    allure.tag("Web interface");
    allure.tag("Authentication");
    allure.severity(Severity.CRITICAL);
    attachment("Attachment name", "Hello world!", "text/plain");
    epic("my_epic");
    parameter("parameter_name", "parameter_value", {
        mode: "hidden",
        excluded: false,
    });
    console.log(`----- user is logged in -------`);
})

Then("user clicks {string}", function (this: CustomWorld, link: string) {
    allure.parameter("time", new Date().toUTCString(), { excluded: true });
    console.log(`----- user clicks ${link} -------`);
})

Then("user will be logged out", function (this: CustomWorld, link: string) {
    // allure.attachment("My image", file, "image/png");
    console.log(`----- user will be logged out -------`);
})