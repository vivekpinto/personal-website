# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: functional\projects.spec.ts >> @regression user can navigate to Projects
- Location: e2e\tests\functional\projects.spec.ts:3:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Target page, context or browser has been closed
```

# Page snapshot

```yaml
- generic [active]:
  - link "Skip to main content" [ref=e1] [cursor=pointer]:
    - /url: "#main-content"
  - generic [ref=e2]: Opens in a new tab
  - generic [ref=e3]: Drag with one pointer to move the chatbot. Click this control without dragging to move it to the next screen corner. Keyboard users can focus this control and use arrow keys to move it. Hold Shift with arrow keys to move farther. Press Home to reset its position.
  - banner [ref=e4]:
    - generic [ref=e5]:
      - link "Vivek Pinto" [ref=e6] [cursor=pointer]:
        - /url: "#home"
      - navigation "Main Navigation" [ref=e7]:
        - list [ref=e8]:
          - listitem [ref=e9]:
            - link "Home" [ref=e10] [cursor=pointer]:
              - /url: "#home"
          - listitem [ref=e11]:
            - link "Experience" [ref=e12] [cursor=pointer]:
              - /url: "#experience"
          - listitem [ref=e13]:
            - link "Education" [ref=e14] [cursor=pointer]:
              - /url: "#education"
          - listitem [ref=e15]:
            - link "Projects" [ref=e16] [cursor=pointer]:
              - /url: "#projects"
          - listitem [ref=e17]:
            - link "Skills" [ref=e18] [cursor=pointer]:
              - /url: "#skills"
          - listitem [ref=e19]:
            - link "Contact" [ref=e20] [cursor=pointer]:
              - /url: "#contact"
```

# Test source

```ts
  1  | import { type Locator, type Page } from '@playwright/test';
  2  | 
  3  | export class Navigation {
  4  |   readonly page: Page;
  5  | 
  6  |   readonly experienceLink: Locator;
  7  |   readonly projectsLink: Locator;
  8  | 
  9  |   constructor(page: Page) {
  10 |     this.page = page;
  11 | 
  12 |     this.experienceLink = page.getByRole('link', {
  13 |       name: 'Experience',
  14 |       exact: true,
  15 |     });
  16 | 
  17 |     this.projectsLink = page.getByRole('link', {
  18 |       name: 'Projects',
  19 |       exact: true,
  20 |     });
  21 |   }
  22 | 
  23 |   async goToExperience() {
  24 |     await this.experienceLink.click();
  25 |   }
  26 | 
  27 |    async goToProjects() {
> 28 |     await this.projectsLink.click();
     |                             ^ Error: locator.click: Target page, context or browser has been closed
  29 |   }
  30 | }
```