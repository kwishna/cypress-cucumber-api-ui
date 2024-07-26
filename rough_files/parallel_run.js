const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const featureDir = 'cypress/e2e';
const numThreads = 4;

// Get all feature files
const featureFiles = fs.readdirSync(featureDir)
  .filter(file => file.endsWith('.feature'))
  .map(file => path.join(featureDir, file));

// Divide features among threads
const featuresPerThread = Math.ceil(featureFiles.length / numThreads);
const threadFeatures = Array.from({ length: numThreads }, (_, i) =>
  featureFiles.slice(i * featuresPerThread, (i + 1) * featuresPerThread)
);

// Run features in each thread
threadFeatures.forEach((features, i) => {
  const command = `npx cypress run --spec "${features.join(',')}"`;
  exec(command, (error, stdout, stderr) => {
    console.log(`Thread ${i + 1} output:`);
    console.log(stdout);
    if (error) {
      console.error(`Thread ${i + 1} error:`, error);
    }
  });
});