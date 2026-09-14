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

  test('@regression The links in the experience section are functional', async ({ homePage, companyLink, openZeusPage }) => {
    await homePage.goto();
    await companyLink.clickZeusLink();
     const zeusPage = await openZeusPage();

        await expect(zeusPage).toHaveURL(
            'https://zeuslearning.com/'
        );

        await zeusPage.close();
    }
);


    

});
    // await expect(newPage.getByRole('link', {name: 'Zeus Learning', exact: true})).toBeVisible();
    // await page.getByRole('link', {name: 'Zeus Learning', exact: true}).click();
    // await page.waitForEvent('popup');
    // await expect(page).toHaveURL('https://zeuslearning.com/');
    // await page.goBack();
    // await expect(page.getByRole('link', {name: 'Accessible Community', exact: true})).toBeVisible();
    // await page.getByRole('link', {name: 'Accessible Community', exact: true}).click();
    // await page.waitForEvent('popup');
    // await expect(page).toHaveURL('https://accessiblecommunity.org/');
    // await page.goBack();
