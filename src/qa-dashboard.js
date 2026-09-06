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

  /*
   * This path works for the deployed GitHub Pages site
   * and keeps the request relative to the portfolio.
   */
  const summaryUrl =
    'test-report/test-summary.json';

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
     * Normalize the values coming from test-summary.json.
     * This prevents "undefined" from appearing if a value
     * is missing from the JSON.
     */
    const passed = Number(summary.passed) || 0;
    const failed = Number(summary.failed) || 0;
    const skipped = Number(summary.skipped) || 0;
    const timedOut = Number(summary.timedOut) || 0;
    const executed = Number(summary.executed) || 0;
    const passRate = Number(summary.passRate) || 0;

    /*
     * Determine the overall automation status.
     */
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

    /*
     * Format the timestamp from test-summary.json.
     */
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
            href="test-report/"
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

          <button
            type="button"
            id="run-automation-tests"
            class="button button--primary"
          >
            ▶ Run Automation Tests
          </button>

          <a
            href="test-report/"
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

async function runAutomationTests() {
  const button = document.querySelector('#run-automation-tests');

  if (!button) {
    return;
  }

  const workerUrl =
    'https://portfolio-test-trigger.vivekpinto5.workers.dev';

  button.disabled = true;
  button.textContent = '⏳ Starting tests...';

  try {
    const response = await fetch(workerUrl, {
      method: 'POST',
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(
        data.error || 'Unable to start automation tests'
      );
    }

    button.textContent = '✓ Tests started';

    setTimeout(() => {
      button.textContent = '▶ Run Automation Tests';
      button.disabled = false;
    }, 3000);

  } catch (error) {
    console.error(
      'Unable to start automation tests:',
      error
    );

    button.textContent = '✕ Unable to start';

    setTimeout(() => {
      button.textContent = '▶ Run Automation Tests';
      button.disabled = false;
    }, 3000);
  }
}


document.addEventListener('DOMContentLoaded', () => {
  renderTestCatalog();
  loadAutomationStatus();

  document.addEventListener(
    'click',
    (event) => {
      const button = event.target.closest(
        '#run-automation-tests'
      );

      if (!button) {
        return;
      }

      runAutomationTests();
    }
  );
});