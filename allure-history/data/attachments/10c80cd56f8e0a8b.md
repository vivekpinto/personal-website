# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation\navigation.spec.ts >> @smoke user can navigate to Experience
- Location: e2e\tests\navigation\navigation.spec.ts:4:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: Test timeout of 30000ms exceeded.
Call log:
  - navigating to "https://vivekpinto.github.io/personal-website/", waiting until "load"

```

# Test source

```ts
  1  | import { type Locator, type Page } from '@playwright/test';
  2  | import { Navigation } from '../components/navigation';
  3  | 
  4  | export class HomePage {
  5  |   readonly page: Page;
  6  |   readonly navigation: Navigation;
  7  | 
  8  |   readonly projectsHeading: Locator;
  9  |   readonly experienceHeading: Locator;
  10 | 
  11 |   constructor(page: Page, navigation: Navigation) {
  12 |     this.page = page;
  13 |     this.navigation = navigation;
  14 | 
  15 |     this.experienceHeading = page.getByRole('heading', {
  16 |       name: 'Professional Experience',
  17 |       exact: true,
  18 |     });
  19 | 
  20 |     this.projectsHeading = page.getByRole('heading', {
  21 |       name: 'Key Projects',
  22 |       exact: true,
  23 |     });
  24 |   }
  25 | 
  26 |   async goto() {
> 27 |     await this.page.goto('./');
     |                     ^ Error: page.goto: Test timeout of 30000ms exceeded.
  28 |   }
  29 | 
  30 |     async goToExperience() {
  31 |     await this.navigation.goToExperience();
  32 |   }
  33 | 
  34 |   async goToProjects() {
  35 |     await this.navigation.goToProjects();
  36 |   }
  37 | 
  38 | }
```