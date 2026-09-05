const fs = require('fs');

const resultsPath = 'test-results/playwright-results.json';
const outputPath = 'test-results/test-summary.json';

if (!fs.existsSync(resultsPath)) {
  console.error(`Results file not found: ${resultsPath}`);
  process.exit(1);
}

const results = JSON.parse(
  fs.readFileSync(resultsPath, 'utf8')
);

let total = 0;
let passed = 0;
let failed = 0;
let skipped = 0;
let timedOut = 0;

function processSuite(suite) {
  for (const spec of suite.specs || []) {
    for (const test of spec.tests || []) {
      total++;

      // Playwright can have multiple results because of retries.
      // The final result represents the final outcome of the test.
      const testResults = test.results || [];

      const finalResult =
        testResults[testResults.length - 1];

      const status = finalResult?.status;

      switch (status) {
        case 'passed':
          passed++;
          break;

        case 'failed':
          failed++;
          break;

        case 'skipped':
          skipped++;
          break;

        case 'timedOut':
          timedOut++;
          break;

        default:
          console.warn(
            `Unknown test status for "${spec.title}":`,
            status
          );
      }
    }
  }

  for (const childSuite of suite.suites || []) {
    processSuite(childSuite);
  }
}

for (const suite of results.suites || []) {
  processSuite(suite);
}

const executed = passed + failed + timedOut;

const passRate =
  executed === 0
    ? 0
    : Math.round((passed / executed) * 100);

const summary = {
  total,
  passed,
  failed,
  skipped,
  timedOut,
  executed,
  passRate,
  generatedAt: new Date().toISOString(),
};

fs.writeFileSync(
  outputPath,
  JSON.stringify(summary, null, 2)
);

console.log('Test summary generated:');
console.log(JSON.stringify(summary, null, 2));