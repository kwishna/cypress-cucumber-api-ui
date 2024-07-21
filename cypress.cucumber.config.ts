/// <reference path="./node_modules/cypress/types/cypress.d.ts" />
import { defineConfig } from "cypress";
// import { config } from "dotenv";
const dotenvPlugin = require('cypress-dotenv');
import ExcelJS from "exceljs";
import { JSONPath } from "jsonpath-plus";
// import esbuild plugin
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild';
// import cucumber plugin
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
// Create Bundler
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
const { allureCypress } = require("allure-cypress/reporter");
import xml2js from 'xml2js';
import Ajv, { ErrorObject } from 'ajv';
import addFormats from 'ajv-formats';
// import { cloudPlugin } from "cypress-cloud/plugin";
// config({ path: "./.env"})

// const mysql = require('mysql') // For connecting to SQL Server
// function queryTestDb(query, config) {
//   // creates a new mysql connection using credentials from cypress.json env's
//   const connection = mysql.createConnection(config.env.db)
//   // start connection to db
//   connection.connect()
//   // exec query + disconnect to db as a Promise
//   return new Promise((resolve, reject) => {
//     connection.query(query, (error, results) => {
//       if (error) reject(error)
//       else {
//         connection.end()
//         return resolve(results)
//       }
//     })
//   })
// }

async function cucumberSetUp(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
): Promise<Cypress.PluginConfigOptions> {
  await addCucumberPreprocessorPlugin(on, config);
  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin(config)],
    })
  );
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  // await addCucumberPreprocessorPlugin(on, config, {
  //   omitBeforeRunHandler: true,
  //   omitAfterRunHandler: true,
  //   omitBeforeSpecHandler: true,
  //   omitAfterSpecHandler: true,
  //   omitAfterScreenshotHandler: true,
  // });
  return config;
}

function xmlToJs(xml: string) {
  return new Promise((res, rej) => {
    // Create a parser
    const parser = new xml2js.Parser({ explicitArray: false });
    // Parse the XML
    parser.parseString(xml, (err, result) => {
      if (err) {
        console.error('Error parsing XML:', err);
        rej(`Error parsing XML: ${err}`);
      }
      res(result);
    });
  });
}

async function readXlsxData(filePath: string, indexOrName?: number | string) {
  const workbook = await new ExcelJS.Workbook();
  return await workbook.xlsx
    .readFile(filePath)
    .then(function () {
      console.log("test", workbook.getWorksheet(indexOrName));
      return workbook.getWorksheet(indexOrName);
    });
}

function readXlsxFile(filePath: string, indexOrName?: number | string) {
  const workbook = new ExcelJS.Workbook();
  return new Promise((resolve, reject) => {
    workbook.xlsx.readFile(filePath)
      .then(function (wb) {
        resolve(wb.getWorksheet(indexOrName));
      })
      .catch((e) => reject(`Failed to read excel workbook. ${e}`))
  });
}

function jsonpath(json: any, path: string) {
  return JSONPath({ json, path });
}

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
function validateSchema(schema, data): [boolean, string | undefined] {
  const ajv = new Ajv({
    allErrors: true,
    verbose: true,
    strict: true,
  });
  addFormats(ajv);

  const validate = ajv.compile(schema);
  const isValid = validate(data);

  let errorMessages: string | undefined = undefined;
  if (!isValid) {
    const errors: ErrorObject<string, Record<string, any>, unknown>[] | null | undefined = validate?.errors;
    errorMessages = errors?.map(error => `${error?.data} ${error?.message}`).join(', ');
    cy.log(`Schema validation failed. Errors: ${errorMessages}`);
  }
  return [isValid, errorMessages];
};

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

      // 1. cucumber support plugin
      let conf = await cucumberSetUp(on, config);

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

      on("task", { validateSchema });
      on("task", { readXlsxFile });
      on("task", { xmlToJs });
      on('task', { jsonpath });

      // conf = await cloudPlugin(on, config);

      // on('task', { queryDb: query => { return queryTestDb(query, config) }, }); //For running sql query

      // (action: 'after:browser:launch', fn: (browser: Browser, browserLaunchDetails: AfterBrowserLaunchDetails) => void | Promise<void>): void
      // (action: 'after:run', fn: (results: CypressCommandLine.CypressRunResult | CypressCommandLine.CypressFailedRunResult) => void | Promise<void>): void
      // (action: 'after:screenshot', fn: (details: ScreenshotDetails) => void | AfterScreenshotReturnObject | Promise<AfterScreenshotReturnObject>): void
      // (action: 'after:spec', fn: (spec: Spec, results: CypressCommandLine.RunResult) => void | Promise<void>): void
      // (action: 'before:run', fn: (runDetails: BeforeRunDetails) => void | Promise<void>): void
      // (action: 'before:spec', fn: (spec: Spec) => void | Promise<void>): void
      // (action: 'before:browser:launch', fn: (browser: Browser, afterBrowserLaunchOptions: BeforeBrowserLaunchOptions) => void | Promise<void> | BeforeBrowserLaunchOptions | Promise<BeforeBrowserLaunchOptions>): void
      // (action: 'file:preprocessor', fn: (file: FileObject) => string | Promise<string>): void
      // (action: 'dev-server:start', fn: (file: DevServerConfig) => Promise<ResolvedDevServerConfig>): void
      // (action: 'task', tasks: Tasks): void
      return conf; // Return plugin because, it might have been updated.
    },
    specPattern: "cypress/e2e/bdd/features/**/*.feature",
    supportFolder: "cypress/support",
    baseUrl: "https://bstackdemo.com/",
    excludeSpecPattern: ["*.js", "*.ts", "*.json", "*.md", "*.html"],
    testIsolation: true,
  },
  retries: {
    runMode: 2,
    openMode: 0,
  },
  // reporter: "cypress-multi-reporters",
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    ignoreVideos: false,
    videoOnFailOnly: true,
    quiet: false,
    debug: true,
    // mochaawesome config - https://github.com/adamgruber/mochawesome-report-generator#options
    reportPageTitle: 'cypress-report',
    reportFilename: "[datetime]-[name]-report",
    timestamp: "longDate",
    charts: true,
    inline: true,
    autoOpen: false,
    overwrite: true,
    showPassed: true,
    showFailed: true,
    showSkipped: true,
    showPending: true,
    showHooks: true,
    saveJson: true,
    saveHtml: true,
    code: false,
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    configFile: "reports.config.json"
  },
  // reporter: 'spec',
  // reporter: 'cypress-mochawesome-reporter',
  // reporterOptions: {
  //   "reporterEnabled": "mochawesome, mocha-junit-reporter",
  //   "mochawesomeReporterOptions": {
  //     "reportDir": "results/mochawesome-report"
  //   },
  //   "mochaJunitReporterReporterOptions": {
  //     "mochaFile": "results/test-results-[hash].xml"
  //   }
  // },
  includeShadowDom: true,
  watchForFileChanges: false,
  animationDistanceThreshold: 5,
  chromeWebSecurity: false,
  blockHosts: null,
  // browsers: [
  //   {
  //     name: 'chrome',
  //     family: 'chromium',
  //     channel: 'stable',
  //     displayName: 'Chrome',
  //     version: '126.0.6478.127',
  //     path: 'C:\Program Files\Google\Chrome\Application\chrome.exe',
  //     minSupportedVersion: 64,
  //     majorVersion: '126',
  //   },
  // ],
  clientCertificates: [],
  defaultCommandTimeout: 4000,
  downloadsFolder: 'outputs/downloads',
  env: {},
  execTimeout: 60000,
  experimentalStudio: false,
  experimentalWebKitSupport: false,
  fileServerFolder: '',
  fixturesFolder: 'cypress/fixtures',
  hosts: null,
  modifyObstructiveCode: true,
  numTestsKeptInMemory: 50,
  pageLoadTimeout: 30000,
  port: null,
  projectId: null,
  redirectionLimit: 20,
  taskTimeout: 60000,
  requestTimeout: 5000,
  responseTimeout: 30000,
  screenshotOnRunFailure: true,
  screenshotsFolder: 'outputs/screenshots',
  scrollBehavior: 'top',
  trashAssetsBeforeRuns: true,
  userAgent: null,
  video: false,
  videoCompression: false,
  videosFolder: 'outputs/videos',
  viewportHeight: 660,
  viewportWidth: 1000,
  waitForAnimations: true
});
