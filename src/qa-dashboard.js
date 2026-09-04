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

document.addEventListener('DOMContentLoaded', renderTestCatalog);