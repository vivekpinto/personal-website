import { test, expect } from '../../fixtures/test-fixtures';


test.describe('Experience', () => {
  test('@regression User navigates to the Experience section', async ({ homePage }) => {
    await homePage.goto();
    await homePage.goToExperience();
    await expect(homePage.experienceHeading).toBeVisible();
    
  });

  test('@regression Experience section has a proper content headings', async ({homePage, experience }) => {
    await homePage.goto();
    await expect(experience.ZeusHeading).toBeVisible();
    await expect(experience.AccessibleCommunityHeading).toBeVisible();

  });

  test('@regression The links in the experience section are functional', async ({ homePage, openExternalPage }) => {
    await homePage.goto();

    const zeusPage = await openExternalPage('Zeus Learning', 'https://zeuslearning.com/');
    await zeusPage.close();

    const AccessibleCommunityPages = await openExternalPage('Accessible Community', 'https://accessiblecommunity.org/');
    await AccessibleCommunityPages.close();
  
  });


    

});
