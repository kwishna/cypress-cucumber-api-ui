import { generate, Options } from 'cucumber-html-reporter';
import { resolve } from 'path';

// @type {require('cucumber-html-reporter').Option}
const options: Options = {
    theme: 'bootstrap',
    jsonFile: resolve('./reports/cucumber-reports/cucumber-report.json'),
    output: resolve('./reports/cucumber-reports/cucumber_reporter.html'),
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    launchReport: true,
    metadata: {
        "App Version": "1.0.0",
        "Test Environment": "STAGING",
        "Browser": "Chrome 115.0.2840.98",
        "Platform": "Windows 11",
        "Parallel": "Scenarios",
        "Executed": "Remote"
    },
    brandTitle: "Krishna",
    jsonDir: resolve("./reports/cucumber-reports"),
    columnLayout: 4,
    ignoreBadJsonFile: false,
    noInlineScreenshots: true,
    name: "cypress-report",
    // storeScreenshots: true,
    // screenshotsDirectory: ""
};
generate(options);