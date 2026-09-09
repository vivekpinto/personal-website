import { testCatalog } from './data/test-catalog.js';

const PRODUCTION_BASE_URL =
  'https://vivekpinto.github.io/personal-website';

const SUMMARY_PATH =
  '/test-report/test-summary.json';

const WORKER_URL =
  'https://portfolio-test-trigger.vivekpinto5.workers.dev';

const POLLING_INTERVAL = 10000;

let pollingTimer = null;
let previousGeneratedAt = null;


/*
 * Get the URL of the production GitHub Pages site.
 */
function getProductionBaseUrl() {
  return PRODUCTION_BASE_URL;
}


/*
 * Get the latest test summary URL.
 *
 * Always use GitHub Pages for the automation data.
 * This also allows the dashboard to work when running
 * the site locally.
 */
function getSummaryUrl() {
  return `${getProductionBaseUrl()}${SUMMARY_PATH}`;
}


/*
 * Get the Allure report URL.
 *
 * The timestamp is ONLY used as a cache-busting query
 * parameter. It does not modify the Allure report.
 */
function getAllureReportUrl(generatedAt = null) {
  const baseUrl =
    `${getProductionBaseUrl()}/test-report/`;

  if (!generatedAt) {
    return baseUrl;
  }

  return `${baseUrl}?v=${encodeURIComponent(generatedAt)}`;
}


/*
 * Render the test catalog.
 */
function renderTestCatalog() {
  const container = document.querySelector('#test-catalog');

  if (!container) {
    return;
  }

  const totalTests = testCatalog.reduce(
    (total, category) =>
      total + category.tests.length,
    0
  );

  const automatedTests = testCatalog.reduce(
    (total, category) =>
      total +
      category.tests.filter(
        (test) => test.automated
      ).length,
    0
  );

  const plannedTests =
    totalTests - automatedTests;

  const coveragePercentage =
    totalTests === 0
      ? 0
      : Math.round(
          (automatedTests / totalTests) * 100
        );

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
          const automatedCount =
            category.tests.filter(
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


/*
 * Fetch the latest test summary.
 *
 * IMPORTANT:
 * The timestamp on this request is for the JSON request only.
 * It does not become the Allure report timestamp.
 */
async function fetchTestSummary() {
  const summaryUrl =
    `${getSummaryUrl()}?t=${Date.now()}`;

  const response = await fetch(
    summaryUrl,
    {
      method: 'GET',
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `Unable to retrieve test summary: ${response.status}`
    );
  }

  const summary = await response.json();

  if (!summary || typeof summary !== 'object') {
    throw new Error(
      'Invalid test summary received'
    );
  }

  return summary;
}


/*
 * Render automation status.
 */
function renderAutomationStatus(summary) {
  const container =
    document.querySelector(
      '#automation-status'
    );

  if (!container) {
    return;
  }

  const passed =
    Number(summary.passed) || 0;

  const failed =
    Number(summary.failed) || 0;

  const skipped =
    Number(summary.skipped) || 0;

  const timedOut =
    Number(summary.timedOut) || 0;

  const executed =
    Number(summary.executed) || 0;

  const passRate =
    Number(summary.passRate) || 0;

  const status =
    failed > 0 || timedOut > 0
      ? 'failure'
      : executed === 0
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

  const runDate =
    summary.generatedAt
      ? new Date(
          summary.generatedAt
        ).toLocaleString()
      : 'Unavailable';

  /*
   * IMPORTANT:
   * The Allure URL is generated from the timestamp
   * that came from test-summary.json.
   *
   * We do NOT use Date.now() here.
   */
  const allureReportUrl =
    getAllureReportUrl(
      summary.generatedAt
    );

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
            ${passed} of ${executed} tests passed
          </p>

        </div>

      </div>

      <div class="automation-status__details">

        <div class="automation-status__item">
          <span class="automation-status__label">
            Passed
          </span>

          <span class="automation-status__value">
            ${passed}
          </span>
        </div>

        <div class="automation-status__item">
          <span class="automation-status__label">
            Failed
          </span>

          <span class="automation-status__value">
            ${failed}
          </span>
        </div>

        <div class="automation-status__item">
          <span class="automation-status__label">
            Skipped
          </span>

          <span class="automation-status__value">
            ${skipped}
          </span>
        </div>

        <div class="automation-status__item">
          <span class="automation-status__label">
            Timed Out
          </span>

          <span class="automation-status__value">
            ${timedOut}
          </span>
        </div>

        <div class="automation-status__item">
          <span class="automation-status__label">
            Pass Rate
          </span>

          <span class="automation-status__value">
            ${passRate}%
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

        <button
          type="button"
          id="run-automation-tests"
          class="button button--primary"
        >
          ▶ Run Automation Tests
        </button>

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
}


/*
 * Load the latest result when the page opens.
 */
async function loadAutomationStatus() {
  const container =
    document.querySelector(
      '#automation-status'
    );

  if (!container) {
    return;
  }

  container.innerHTML = `
    <div class="automation-status__content">
      <h3>Latest Automation Run</h3>
      <p>Loading latest test run...</p>
    </div>
  `;

  try {
    const summary =
      await fetchTestSummary();

    /*
     * Store the timestamp of the report currently
     * displayed on the dashboard.
     */
    previousGeneratedAt =
      summary.generatedAt || null;

    console.log(
      'Latest automation timestamp:',
      previousGeneratedAt
    );

    console.log(
      'Latest Allure URL:',
      getAllureReportUrl(
        previousGeneratedAt
      )
    );

    renderAutomationStatus(summary);

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

          <button
            type="button"
            id="run-automation-tests"
            class="button button--primary"
          >
            ▶ Run Automation Tests
          </button>

          <a
            href="${getAllureReportUrl()}"
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


/*
 * Start GitHub Actions through the Worker.
 */
async function runAutomationTests() {
  const button =
    document.querySelector(
      '#run-automation-tests'
    );

  if (!button) {
    return;
  }

  /*
   * Capture the timestamp BEFORE starting
   * the new automation run.
   */
  let startingGeneratedAt =
    previousGeneratedAt;

  /*
   * Get the most recent timestamp immediately
   * before triggering the workflow.
   */
  try {
    const currentSummary =
      await fetchTestSummary();

    startingGeneratedAt =
      currentSummary.generatedAt ||
      previousGeneratedAt ||
      null;

    previousGeneratedAt =
      startingGeneratedAt;

  } catch (error) {
    console.warn(
      'Could not determine current test timestamp:',
      error
    );
  }

  button.disabled = true;
  button.textContent =
    '⏳ Starting tests...';

  try {
    const response =
      await fetch(
        WORKER_URL,
        {
          method: 'POST',
        }
      );

    const data =
      await response.json();

    if (
      !response.ok ||
      !data.success
    ) {
      throw new Error(
        data.error ||
        'Unable to start automation tests'
      );
    }

    button.textContent =
      '⏳ Tests running...';

    startAutomationStatusPolling(
      startingGeneratedAt
    );

  } catch (error) {
    console.error(
      'Unable to start automation tests:',
      error
    );

    button.disabled = false;

    button.textContent =
      '✕ Unable to start';

    setTimeout(() => {
      button.textContent =
        '▶ Run Automation Tests';
    }, 3000);
  }
}


/*
 * Poll for a NEW test result.
 */
function startAutomationStatusPolling(
  startingGeneratedAt
) {
  stopAutomationStatusPolling();

  const poll = async () => {
    try {
      const summary =
        await fetchTestSummary();

      const currentGeneratedAt =
        summary.generatedAt || null;

      /*
       * Only consider the run complete when
       * generatedAt changes.
       */
      if (
        currentGeneratedAt &&
        currentGeneratedAt !==
          startingGeneratedAt
      ) {
        console.log(
          'New automation result detected:',
          currentGeneratedAt
        );

        previousGeneratedAt =
          currentGeneratedAt;

        renderAutomationStatus(
          summary
        );

        const button =
          document.querySelector(
            '#run-automation-tests'
          );

        if (button) {
          button.disabled = false;
          button.textContent =
            '✓ Tests completed';

          setTimeout(() => {
            button.textContent =
              '▶ Run Automation Tests';
          }, 3000);
        }

        stopAutomationStatusPolling();

        return;
      }

      /*
       * The old timestamp is still being returned.
       * Keep polling.
       */
      pollingTimer =
        setTimeout(
          poll,
          POLLING_INTERVAL
        );

    } catch (error) {
      console.error(
        'Unable to check automation status:',
        error
      );

      /*
       * Temporary network/CDN error.
       * Keep polling.
       */
      pollingTimer =
        setTimeout(
          poll,
          POLLING_INTERVAL
        );
    }
  };

  /*
   * First check after 10 seconds.
   */
  pollingTimer =
    setTimeout(
      poll,
      POLLING_INTERVAL
    );
}


/*
 * Stop polling.
 */
function stopAutomationStatusPolling() {
  if (pollingTimer) {
    clearTimeout(
      pollingTimer
    );

    pollingTimer = null;
  }
}


/*
 * Handle Run Automation button clicks.
 */
document.addEventListener(
  'click',
  (event) => {
    const button =
      event.target.closest(
        '#run-automation-tests'
      );

    if (!button) {
      return;
    }

    runAutomationTests();
  }
);


/*
 * Initialize dashboard.
 */
document.addEventListener(
  'DOMContentLoaded',
  () => {
    renderTestCatalog();
    loadAutomationStatus();
  }
);