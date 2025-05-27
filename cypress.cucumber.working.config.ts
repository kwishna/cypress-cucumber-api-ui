/// <reference path="./node_modules/cypress/types/cypress.d.ts" />
import { defineConfig } from "cypress";
import { jsonpath, readXlsxFile, validateSchema, xmlToJs } from "./configs/cypress.taks";
import { cypressCommonConfig } from "./configs/cypress.common.config";
import { configureVisualRegression } from "cypress-visual-regression/dist/plugin";
import { beforeRunHook } from "cypress-mochawesome-reporter/lib";
import { lighthouse } from "@cypress-audit/lighthouse";
import {cucumberSetUp, cypressTerminalReporter, setUpAllureReporter} from "./configs/cypress.common.plugin";
import {setUpBeforeBrowserLaunch, setUpSonarqubeLaunch} from "./configs/cypress.common.hooks";
// const dotenvPlugin = require('cypress-dotenv');

// @type {Cypress.Option}
export default defineConfig({
  e2e: {
    async setupNodeEvents(
      _on: Cypress.PluginEvents,
      // on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions
    ): Promise<Cypress.PluginConfigOptions> {

      const on = require('cypress-on-fix')(_on)

      // ----- cucumber support plugin -----
      await cucumberSetUp(on, config);

      // ------ cypress mochawesome reporter ------
      require('cypress-mochawesome-reporter/plugin')(on);

      // ------ dotenv -------
      // config = dotenvPlugin(config, { path: './.env' });

      // ----- cypress allure reporter ------
      const allurePlugin = setUpAllureReporter(on, config);

      // ----- cypress terminal reporter ------
      cypressTerminalReporter(on, config);

      // ----- cypress visual regression ------
      configureVisualRegression(on);

      // ----- hooks -----
      on('before:run', async (details): Promise<void> => {
        await beforeRunHook(details)
      });

      on("before:browser:launch", (browser, launchOptions): void => {
        setUpBeforeBrowserLaunch(browser, launchOptions);
      });

      // on("before:spec", async (spec) => {
      // await beforeSpecHandler(config, spec);
      // Your own `before:spec` code goes here.
      // });

      // on("after:spec", async (spec, results) => {
      // await afterSpecHandler(config, spec, results);
      // Your own `after:spec` code goes here.
      // });

      // on("after:screenshot", async (details) => {
      // await afterScreenshotHandler(config, details);
      // Your own `after:screenshot` code goes here.
      // });

      on('after:run', async (details): Promise<void> => {
        // await afterRunHandler(config); // Cucumber
        allurePlugin.onAfterRun(details); // Allure
        // await afterRunHook(); // Mochareporter
        setUpSonarqubeLaunch(details);
      })

      on("task", { validateSchema });
      on("task", { readXlsxFile });
      on("task", { xmlToJs });
      on('task', { jsonpath });
      on("task", {
        lighthouse: lighthouse(),
      });
      return config;
    },
    specPattern: "cypress/e2e/bdd/features/**/*.feature",
    supportFolder: "cypress/support",
    baseUrl: "https://bstackdemo.com/",
    excludeSpecPattern: ["*.js", "*.ts", "*.json", "*.md", "*.html"],
    testIsolation: true,
  },
  ...cypressCommonConfig
});
