const report = require("multiple-cucumber-html-reporter");
const os = require("os");

const osName = () => {
    switch (os.platform()) {
        case "win32":
            return "windows";
        case "linux":
            return "ubuntu";
        default:
            console.log("Undefined OS");
    }
};

const browserName = (browser = "chrome") => {
    switch (browser) {
        case "chrome":
            return "Chrome";
        case "firefox":
            return "Firefox";
        case "edge":
            return "Edge";
        case "webkit":
            return "Safari";
        default:
            console.log("Undefined Browser");
    }
};

report.generate({
    jsonDir: "./reports/cucumber-reports/",
    reportPath: "./reports/multi-cucumber-html-report",
    metadata: {
        browser: {
            name: browserName(),
            version: "v115.0.0.0",
        },
        platform: {
            name: osName(),
            version: "v11",
        },
    },
    customData: {
        title: "Run Info",
        data: [
            { label: "Project", value: "Cypress" },
            { label: "Release", value: "v1.0.0" },
            { label: "Cypress Version", value: "v13.13.1" },
            { label: "Node Version", value: "v20.12.2" },
            {
                label: "Execution Start Time",
                value: `${Date.now()}`,
            },
            {
                label: "Execution End Time",
                value: `${Date.now()}`,
            },
        ],
    },
    pageTitle: "cypress",
    reportName: "cypress-report",
    displayDuration: true,
    displayReportTime: true,
});