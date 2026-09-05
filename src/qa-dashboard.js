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

  try {
    const response = await fetch(
      'https://api.github.com/repos/vivekpinto/personal-website/actions/runs?per_page=10'
    );

    if (!response.ok) {
      throw new Error('Unable to retrieve GitHub Actions status');
    }

    const data = await response.json();

    const workflowRuns = data.workflow_runs || [];

    const playwrightRun = workflowRuns.find(
      (run) => run.name === 'Playwright E2E Tests'
    );

    if (!playwrightRun) {
      container.innerHTML = `
        <div class="automation-status__content">
          <h3>Automation Status</h3>
          <p>No Playwright test run found yet.</p>
        </div>
      `;

      return;
    }

    const status = playwrightRun.conclusion;

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
          : 'In Progress';

    const statusClass =
      status === 'success'
        ? 'success'
        : status === 'failure'
          ? 'failure'
          : 'running';

    const runDate = new Date(
      playwrightRun.updated_at
    ).toLocaleString();

    container.innerHTML = `
      <div class="automation-status__content">

        <h3>Automation Status</h3>

        <div class="automation-status__details">

          <div class="automation-status__item">
            <span class="automation-status__label">
              Last Run
            </span>

            <span class="automation-status__value">
              ${runDate}
            </span>
          </div>

          <div class="automation-status__item">
            <span class="automation-status__label">
              Status
            </span>

            <span
              class="automation-status__value automation-status__value--${statusClass}"
            >
              ${statusIcon} ${statusText}
            </span>
          </div>

        </div>

      </div>
    `;
  } catch (error) {
    console.error(
      'Unable to load automation status:',
      error
    );

    container.innerHTML = `
      <div class="automation-status__content">
        <h3>Automation Status</h3>
        <p>
          Unable to retrieve the latest test run.
        </p>
      </div>
    `;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderTestCatalog();
  loadAutomationStatus();
});