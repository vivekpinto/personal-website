import { test, expect } from '../../fixtures/test-fixtures';

test('@regression user can navigate to Projects', async ({ homePage }) => {
  await homePage.goto();

  await homePage.navigation.goToProjects();

  await expect(homePage.projectsHeading).toBeVisible();
});