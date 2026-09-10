# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: functional\experience.spec.ts >> Experience >> @regression The links in the experience section are functional
- Location: e2e\tests\functional\experience.spec.ts:20:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('link', { name: 'Zeus Learning' })

```

# Test source

```ts
  1  | import { test, expect } from '../../fixtures/test-fixtures';
  2  | 
  3  | 
  4  | test.describe('Experience', () => {
  5  |   test('@regression User navigates to the Experience section', async ({ homePage }) => {
  6  |     await homePage.goto();
  7  |     await expect(homePage.navigation.experienceLink).toBeVisible();
  8  |     await homePage.navigation.goToExperience();
  9  |     await expect(homePage.experienceHeading).toBeVisible();
  10 |     
  11 |   });
  12 | 
  13 |   test('@regression Experience section has a proper content headings', async ({ page, homePage }) => {
  14 |     await homePage.goto();
  15 |     await expect(page.getByRole('heading', {name: 'Senior Quality Engineer and Accessibility Specialist', exact: true})).toBeVisible();
  16 |     await expect(page.getByRole('heading', {name: 'Digital Evaluator', exact: true})).toBeVisible();
  17 | 
  18 |   });
  19 | 
  20 |   test('@regression The links in the experience section are functional', async ({ context, page, homePage }) => {
  21 |     await homePage.goto();
  22 |     const [newPage] = await Promise.all([
  23 |     context.waitForEvent('page'),
> 24 |     page.getByRole('link', { name: 'Zeus Learning' }).click(),
     |                                                       ^ Error: locator.click: Test timeout of 30000ms exceeded.
  25 |   ]);
  26 | 
  27 |   await newPage.waitForLoadState();
  28 | 
  29 |   await expect(newPage).toHaveURL('https://zeuslearning.com/');
  30 | });
  31 |     // await expect(newPage.getByRole('link', {name: 'Zeus Learning', exact: true})).toBeVisible();
  32 |     // await page.getByRole('link', {name: 'Zeus Learning', exact: true}).click();
  33 |     // await page.waitForEvent('popup');
  34 |     // await expect(page).toHaveURL('https://zeuslearning.com/');
  35 |     // await page.goBack();
  36 |     // await expect(page.getByRole('link', {name: 'Accessible Community', exact: true})).toBeVisible();
  37 |     // await page.getByRole('link', {name: 'Accessible Community', exact: true}).click();
  38 |     // await page.waitForEvent('popup');
  39 |     // await expect(page).toHaveURL('https://accessiblecommunity.org/');
  40 |     // await page.goBack();
  41 | });
  42 | 
```