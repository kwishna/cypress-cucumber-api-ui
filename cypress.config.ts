/// <reference path="./node_modules/cypress/types/cypress.d.ts" />
import cypressGrepPlugin from '@cypress/grep/src/plugin';
import { cypressCommonConfig } from "./configs/cypress.common.config";
import { jsonpath, readXlsxFile, validateSchema, xmlToJs } from "./configs/cypress.taks";
import { defineConfig } from "cypress";
import { collectFailingTests } from "cypress-plugin-last-failed";
// import { configureVisualRegression } from "cypress-visual-regression";
import { configureVisualRegression } from "cypress-visual-regression/dist/plugin";
import { afterRunHook, beforeRunHook } from "cypress-mochawesome-reporter/lib";
// import { createHtmlReport } from "axe-html-reporter";
import { lighthouse, prepareAudit } from "@cypress-audit/lighthouse";
import { config } from "dotenv";
// @ts-ignore
import { allureCypress } from "allure-cypress/reporter";
config({ path: './.env' });

// @type {Cypress.Option}
export default defineConfig({
  e2e: {
    experimentalRunAllSpecs: true,
    experimentalWebKitSupport: true,
    experimentalMemoryManagement: true,
    experimentalStudio: false,
    async setupNodeEvents(
      // on: Cypress.PluginEvents,
      _on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions
    ): Promise<Cypress.PluginConfigOptions> {

      const on = require('cypress-on-fix')(_on)

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
      // require('@cypress/grep/src/plugin')(config); // Correct

      // 2. cypress mochaawesome reporter
      // require('cypress-mochawesome-reporter/plugin')(on, config);
       require('cypress-mochawesome-reporter/plugin')(on);

      // 3. allure reporter
      // allureCypress(on, {
      //   resultsDir: "./reports/allure-results",
      //   environmentInfo: { "author": "Krishna" }
      //   // videoOnFailOnly: true
      // });

      const allurePlugin = allureCypress(on, config, {
        resultsDir: "./results/allure-results",
        environmentInfo: { "author": "Krishna" },
        // videoOnFailOnly: true,
        links: {
          jira: {
            nameTemplate: "%s",
            urlTemplate: "hhtps://jira.com/browse/%s",
          }
        }
      })

      // 4. .env Plugin
      // config = dotenvPlugin(config, { path: './.env' });

      // 5. cypress terminal report
      require('cypress-terminal-report/src/installLogsPrinter')(on, {
        printLogsToFile: "always", // 'onFail, 'never'
        outputRoot: config.projectRoot + "/logs",
        specRoot: 'cypress/e2e',
        outputTarget: {
          'out.txt': 'txt',
          'out.json': 'json'
        }
      });

      // 6. Collect and run only failed tests
      collectFailingTests(on, config);
      cypressGrepPlugin(config);
      configureVisualRegression(on);
      // @ts-ignore
      on("task", { validateSchema });
      // @ts-ignore
      on('task', { jsonpath });
      on("task", { readXlsxFile });
      on("task", { xmlToJs });

      on("task", {
        lighthouse: lighthouse(), // calling the function is important
      });

      // on('task', {
      //     genHTMLReport(violationsResults) {
      //       createHtmlReport({
      //         results: { violations: violationsResults },
      //         options: {
      //           outputDir: 'cypress/results/reports',
      //           reportFileName: 'a11y.html'
      //         }
      //       });
      //       return null;
      //     }
      //   });

      // conf = await cloudPlugin(on, config);

      on('before:run', async (details) => await beforeRunHook(details));

      on("before:browser:launch", (browser, launchOptions) => {
        prepareAudit(launchOptions);
        if (browser.family === 'chromium' && browser.name !== 'electron') {
          launchOptions.args.push(
            "--incognito",
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--auto-open-devtools-for-tabs'
          );
          return launchOptions;
        }
        if (browser.name === 'electron') {
          launchOptions.preferences.incognito = true;
          return launchOptions;
        }
      });

      on('after:run', async (details) => {
        allurePlugin.onAfterRun(details);
        // await afterRunHook();
        return require('cypress-sonarqube-reporter/mergeReports')(details);
      })


      return config;
    },
    specPattern: "cypress/e2e/**/*.spec.*{ts,js}",
    supportFolder: "cypress/support",
    // baseUrl: "https://the-internet.herokuapp.com/",
    baseUrl: "https://www.phptravels.net/",
    excludeSpecPattern: ["*.feature", "*.json", "*.md", "*.html"],
    testIsolation: true
  },
  ...cypressCommonConfig
});
