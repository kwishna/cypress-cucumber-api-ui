/// <reference path="./node_modules/cypress/types/cypress.d.ts" />
import { defineConfig } from "cypress";
import { cypressCommonConfig } from "./configs/cypress.common.config";
import { jsonpath, readXlsxFile, validateSchema, xmlToJs } from "./configs/cypress.taks";
import { collectFailingTests } from "cypress-plugin-last-failed";
// import { config } from "dotenv";
const { allureCypress } = require("allure-cypress/reporter");

// @type {Cypress.Option}
export default defineConfig({
  e2e: {
    async setupNodeEvents(
      _on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions
    ): Promise<Cypress.PluginConfigOptions> {

      const on = require('cypress-on-fix')(_on)

      on("before:browser:launch", (browser, launchOptions) => {
        if (browser.family === 'chromium' && browser.name !== 'electron') {
          launchOptions.args.push("--incognito");
          return launchOptions;
        }
        if (browser.name === 'electron') {
          launchOptions.preferences.incognito = true;
          return launchOptions;
        }
      });

      /*
      npx cypress run --env grep="auth user" - # run only the tests with "auth user" in the title
      npx cypress run --env grep="hello; auth user" - # run tests with "hello" or "auth user" in their titles by separating them with ";" character
      npx cypress run --env grepTags=@fast - # run tests tagged @fast
      npx cypress run --env grep=login,grepTags=smoke - # that have "login" in their titles - # run only the tests tagged "smoke"
      npx cypress run --env grep=user,grepFilterSpecs=true - # only run the specs that have any tests with "user" in their titles
      npx cypress run --env grepTags=@smoke,grepFilterSpecs=true - # only run the specs that have any tests tagged "@smoke"
      npx cypress run --env grepUntagged=true - # run only tests that do not have any tags and are not inside suites that have any tags
      */
      // 1. cypress tag
      // You can filter tests to run using part of their title via 'grep', and via explicit tags via 'grepTags' Cypress environment variables.
      require('@cypress/grep/src/plugin')(config);

      // 2. cypress mochaawesome reporter
      require('cypress-mochawesome-reporter/plugin')(on);

      // 3. allure reporter
      allureCypress(on, {
        resultsDir: "./reports/allure-results",
        environmentInfo: { "author": "Krishna" }
        // videoOnFailOnly: true
      });

      // 4. .env Plugin
      // config = dotenvPlugin(config, { path: './.env' });

      // 5. Collect and run only failed tests
      collectFailingTests(on, config);

      // @ts-ignore
      on("task", { validateSchema });
      // @ts-ignore
      on('task', { jsonpath });
      on("task", { readXlsxFile });
      on("task", { xmlToJs });

      // conf = await cloudPlugin(on, config);
      return config;
    },
    specPattern: "cypress/e2e/**/*.spec.*{ts,js}",
    supportFolder: "cypress/support",
    baseUrl: "https://the-internet.herokuapp.com/",
    excludeSpecPattern: ["*.feature", "*.json", "*.md", "*.html"],
    testIsolation: true,
  },
  ...cypressCommonConfig
});
