import { test, expect } from '../../fixtures/test-fixtures';

test('@smoke portfolio homepage loads', async ({ homePage }) => {
  await homePage.goto();

  await expect(homePage.page).toHaveTitle(/Vivek Pinto - Quality Engineer & Accessibility Specialist/);
});