import {test, expect} from '../../fixtures/test-fixtures';


test('@smoke user can navigate to Experience', async ({ homePage }) => {
   await homePage.goto();

  await expect(homePage.navigation.experienceLink).toBeVisible();

  await homePage.navigation.goToExperience();

  await expect(homePage.experienceHeading).toBeVisible();
});