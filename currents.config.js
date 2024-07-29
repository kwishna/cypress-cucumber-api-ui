// currents.config.js
module.exports = {
    projectId: "Ij0RfK", // Project Id obtained from https://app.currents.dev or Sorry Cypress
    recordKey: "XXXXXXX", // Record key obtained from https://app.currents.dev, any value for Sorry Cypress
    // cloudServiceUrl: "https://cy.currents.dev", // Sorry Cypress users - the director service URL
    cloudServiceUrl: "http://localhost:1234", // Sorry Cypress users - the director service URL
    // Additional headers for network requests, undefined by default
    networkHeaders: {
      "User-Agent": "Custom",
      "x-ms-blob-type": "BlockBlob"
    },
    e2e: {
      batchSize: 3, // orchestration batch size for e2e tests (Currents only, read below)
    },
    component: {
      batchSize: 5, // orchestration batch size for component tests (Currents only, read below)
    },
  };