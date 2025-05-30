import { prepareAudit } from "@cypress-audit/lighthouse";

export const setUpBeforeBrowserLaunch = (browser: Cypress.Browser, launchOptions: Cypress.AfterBrowserLaunchDetails) => {
    setUpLighthouseAudit(launchOptions);
    setUpBrowserLauncher(browser, launchOptions);
}

export const setUpSonarqubeLaunch = (results: CypressCommandLine.CypressRunResult | CypressCommandLine.CypressFailedRunResult) => {
    return require('cypress-sonarqube-reporter/mergeReports')(results);
}

const setUpBrowserLauncher = (browser: Cypress.Browser, launchOptions: Cypress.AfterBrowserLaunchDetails) => {
    if (browser.family === 'chromium' && browser.name !== 'electron') {
        launchOptions["args"].push("--incognito", '--disable-gpu', '--disable-dev-shm-usage', '--auto-open-devtools-for-tabs');
        return launchOptions;
    }
    if (browser.name === 'electron') {
        launchOptions["preferences"].incognito = true;
        return launchOptions;
    }
}

const setUpLighthouseAudit = (browserLaunchDetails: Cypress.AfterBrowserLaunchDetails) => {
    prepareAudit(browserLaunchDetails);
}