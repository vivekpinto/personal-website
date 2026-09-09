import { testCatalog } from './data/test-catalog.js';

function renderTestCatalog() {
  const container = document.querySelector('#test-catalog');

  if (!container) {
    return;
  }

  const totalTests = testCatalog.reduce(
    (total, category) => total + category.tests.length,
    0
  );

  const automatedTests = testCatalog.reduce(
    (total, category) =>
      total + category.tests.filter((test) => test.automated).length,
    0
  );

  const plannedTests = totalTests - automatedTests;

  const coveragePercentage =
    totalTests === 0
      ? 0
      : Math.round((automatedTests / totalTests) * 100);

  container.innerHTML = `
    <div class="qa-automation__summary">

      <div class="qa-automation__stat">
        <span class="qa-automation__stat-value">
          ${totalTests}
        </span>
        <span class="qa-automation__stat-label">
          Total Tests
        </span>
      </div>

      <div class="qa-automation__stat">
        <span class="qa-automation__stat-value">
          ${automatedTests}
        </span>
        <span class="qa-automation__stat-label">
          Automated
        </span>
      </div>

      <div class="qa-automation__stat">
        <span class="qa-automation__stat-value">
          ${plannedTests}
        </span>
        <span class="qa-automation__stat-label">
          Planned
        </span>
      </div>

      <div class="qa-automation__stat">
        <span class="qa-automation__stat-value">
          ${coveragePercentage}%
        </span>
        <span class="qa-automation__stat-label">
          Automation Coverage
        </span>
      </div>

    </div>

    <div class="test-catalog__categories">

      ${testCatalog
        .map((category) => {
          const automatedCount = category.tests.filter(
            (test) => test.automated
          ).length;

          return `
            <article class="test-category">

              <div class="test-category__header">

                <div>
                  <h3 class="test-category__title">
                    ${category.category}
                  </h3>

                  <p class="test-category__description">
                    ${category.description}
                  </p>
                </div>

                <span class="test-category__count">
                  ${automatedCount}/${category.tests.length}
                </span>

              </div>

              <ul class="test-category__list">

                ${category.tests
                  .map(
                    (test) => `
                      <li class="test-category__item">

                        <span
                          class="test-category__status"
                          aria-hidden="true"
                        >
                          ${test.automated ? '✓' : '○'}
                        </span>

                        <span>
                          ${test.name}
                        </span>

                      </li>
                    `
                  )
                  .join('')}

              </ul>

            </article>
          `;
        })
        .join('')}

    </div>
  `;
}

async function loadAutomationStatus() {
  const container = document.querySelector('#automation-status');

  if (!container) {
    return;
  }

  const summaryUrl =
    '/personal-website/test-report/test-summary.json';

  try {
    const response = await fetch(summaryUrl, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(
        `Unable to retrieve test summary: ${response.status}`
      );
    }

    const summary = await response.json();

    /*
     * Add a cache-busting query parameter to the Allure report.
     *
     * Every test run generates a new generatedAt timestamp,
     * which means the URL changes after every successful run.
     *
     * Example:
     * /personal-website/test-report/?v=2026-09-09T09%3A38%3A33.023Z
     */
    const allureReportUrl = summary.generatedAt
      ? `/personal-website/test-report/?v=${encodeURIComponent(
          summary.generatedAt
        )}`
      : '/personal-website/test-report/';

    const status =
      summary.failed > 0 || summary.timedOut > 0
        ? 'failure'
        : summary.executed === 0
          ? 'unknown'
          : 'success';

    const statusIcon =
      status === 'success'
        ? '✓'
        : status === 'failure'
          ? '✕'
          : '•';

    const statusText =
      status === 'success'
        ? 'Passed'
        : status === 'failure'
          ? 'Failed'
          : 'No tests executed';

    const statusClass =
      status === 'success'
        ? 'success'
        : status === 'failure'
          ? 'failure'
          : 'unknown';

    const runDate = summary.generatedAt
      ? new Date(summary.generatedAt).toLocaleString()
      : 'Unavailable';

    container.innerHTML = `
      <div class="automation-status__content">

        <h3>Latest Automation Run</h3>

        <div class="automation-status__result">

          <span
            class="automation-status__result-icon automation-status__result-icon--${statusClass}"
            aria-hidden="true"
          >
            ${statusIcon}
          </span>

          <div>
            <strong
              class="automation-status__result-text automation-status__result-text--${statusClass}"
            >
              ${statusText}
            </strong>

            <p>
              ${summary.passed} of ${summary.executed} tests passed
            </p>
          </div>

        </div>

        <div class="automation-status__details">

          <div class="automation-status__item">
            <span class="automation-status__label">
              Passed
            </span>

            <span class="automation-status__value">
              ${summary.passed}
            </span>
          </div>

          <div class="automation-status__item">
            <span class="automation-status__label">
              Failed
            </span>

            <span class="automation-status__value">
              ${summary.failed}
            </span>
          </div>

          <div class="automation-status__item">
            <span class="automation-status__label">
              Skipped
            </span>

            <span class="automation-status__value">
              ${summary.skipped}
            </span>
          </div>

          <div class="automation-status__item">
            <span class="automation-status__label">
              Timed Out
            </span>

            <span class="automation-status__value">
              ${summary.timedOut}
            </span>
          </div>

          <div class="automation-status__item">
            <span class="automation-status__label">
              Pass Rate
            </span>

            <span class="automation-status__value">
              ${summary.passRate}%
            </span>
          </div>

          <div class="automation-status__item">
            <span class="automation-status__label">
              Last Run
            </span>

            <span class="automation-status__value">
              ${runDate}
            </span>
          </div>

        </div>

        <div class="automation-status__actions">

          <a
            href="https://github.com/vivekpinto/personal-website/actions/workflows/playwright.yml"
            class="button button--primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            ▶ Run Automation Tests
          </a>

          <a
            href="${allureReportUrl}"
            class="button button--secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            📊 View Allure Report
          </a>

        </div>

      </div>
    `;
  } catch (error) {
    console.error(
      'Unable to load automation summary:',
      error
    );

    container.innerHTML = `
      <div class="automation-status__content">

        <h3>Latest Automation Run</h3>

        <p>
          Test execution data is currently unavailable.
        </p>

        <div class="automation-status__actions">

          <a
            href="https://github.com/vivekpinto/personal-website/actions/workflows/playwright.yml"
            class="button button--primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            ▶ Run Automation Tests
          </a>

          <a
            href="/personal-website/test-report/"
            class="button button--secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            📊 View Allure Report
          </a>

        </div>

      </div>
    `;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderTestCatalog();
  loadAutomationStatus();
});