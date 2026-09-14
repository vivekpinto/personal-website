import { test, expect } from '../../fixtures/test-fixtures';


test.describe('Experience', () => {
  test('@regression User navigates to the Experience section', async ({ homePage }) => {
    await homePage.goto();
    await expect(homePage.navigation.experienceLink).toBeVisible();
    await homePage.navigation.goToExperience();
    await expect(homePage.experienceHeading).toBeVisible();
    
  });

  test('@regression Experience section has a proper content headings', async ({ page, homePage }) => {
    await homePage.goto();
    await expect(page.getByRole('heading', {name: 'Senior Quality Engineer and Accessibility Specialist', exact: true})).toBeVisible();
    await expect(page.getByRole('heading', {name: 'Digital Evaluator', exact: true})).toBeVisible();

  });

  test('@regression The links in the experience section are functional', async ({ homePage, openExternalPage }) => {
    await homePage.goto();

    const zeusPage = await openExternalPage('Zeus Learning', 'https://zeuslearning.com/');
    await zeusPage.close();

    const AccessibleCommunityPages = await openExternalPage('Accessible Community', 'https://accessiblecommunity.org/');
    await AccessibleCommunityPages.close();
  
  });


    

});
