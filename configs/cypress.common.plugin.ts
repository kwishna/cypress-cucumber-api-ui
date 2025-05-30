import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
// @ts-ignore
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";
// @ts-ignore
import { allureCypress } from "allure-cypress/reporter";

export const cucumberSetUp = async function (
    on: Cypress.PluginEvents,
    config: Cypress.PluginConfigOptions
): Promise<void> {
    await addCucumberPreprocessorPlugin(on, config);
    on(
        "file:preprocessor",
        createBundler({
            plugins: [createEsbuildPlugin(config)],
        })
    );
}

export const cucumberSetUp2 = async function (
    on: Cypress.PluginEvents,
    config: Cypress.PluginConfigOptions
): Promise<void> {
    // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
    await addCucumberPreprocessorPlugin(on, config, {
      omitBeforeRunHandler: true,
      omitAfterRunHandler: true,
      omitBeforeSpecHandler: true,
      omitAfterSpecHandler: true,
      omitAfterScreenshotHandler: true,
    });
    on(
        "file:preprocessor",
        createBundler({
            plugins: [createEsbuildPlugin(config)],
        })
    );
}

export const setUpAllureReporter = function (
    on: Cypress.PluginEvents,
    config: Cypress.PluginConfigOptions
) {
    return allureCypress(on, config, {
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
}

export const cypressTerminalReporter = function (
    on: Cypress.PluginEvents,
    config: Cypress.PluginConfigOptions
) {
    require('cypress-terminal-report/src/installLogsPrinter')(on, {
        printLogsToFile: "always", // 'onFail, 'never'
        outputRoot: config.projectRoot + "/logs",
        specRoot: 'cypress/e2e',
        outputTarget: {
            'out.txt': 'txt',
            'out.json': 'json'
        }
    });
}