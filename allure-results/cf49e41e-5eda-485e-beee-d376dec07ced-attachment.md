# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: functional\experience.spec.ts >> Experience >> @regression The links in the experience section are functional
- Location: e2e\tests\functional\experience.spec.ts:20:3

# Error details

```
Test timeout of 30000ms exceeded while setting up "zeusPage".
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('link', { name: 'Zeus Learning', exact: true })

```

# Test source

```ts
  1  | import {test, expect, Page, Locator} from '@playwright/test';
  2  | 
  3  | export class CompanyLink {
  4  |     readonly page: Page;
  5  |     readonly companyZeusLink: Locator;
  6  | 
  7  |     constructor(page: Page) {
  8  |         this.page = page;
  9  |         this.companyZeusLink = page.getByRole('link', {
  10 |             name: 'Zeus Learning',
  11 |             exact: true,
  12 |         });
  13 | 
  14 |     }
  15 | 
  16 |     async clickZeusLink() {
> 17 |         await this.companyZeusLink.click();
     |                                    ^ Error: locator.click: Test timeout of 30000ms exceeded.
  18 |     }
  19 | 
  20 | 
  21 | }
```