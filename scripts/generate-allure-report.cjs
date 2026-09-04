const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const resultsDir = path.join(process.cwd(), 'allure-results');
const reportDir = path.join(process.cwd(), 'allure-report');
const historySource = path.join(reportDir, 'history');
const historyDestination = path.join(resultsDir, 'history');

if (fs.existsSync(historySource)) {
  fs.cpSync(historySource, historyDestination, {
    recursive: true,
  });
}

execSync(
  'npx allure generate allure-results --clean -o allure-report',
  {
    stdio: 'inherit',
  }
);