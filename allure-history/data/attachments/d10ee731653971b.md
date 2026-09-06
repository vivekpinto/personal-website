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
Error: expect(locator).toBeVisible() failed

Locator:  getByRole('link', { name: 'Experience', exact: true })
Expected: visible
Received: undefined

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
  1  | import {test, expect} from '../../fixtures/test-fixtures';
  2  | 
  3  | 
  4  | test('@smoke user can navigate to Experience', async ({ homePage }) => {
  5  |    await homePage.goto();
  6  | 
> 7  |   await expect(homePage.navigation.experienceLink).toBeVisible();
     |                                                    ^ Error: expect(locator).toBeVisible() failed
  8  | 
  9  |   await homePage.navigation.goToExperience();
  10 | 
  11 |   await expect(homePage.experienceHeading).toBeVisible();
  12 | });
```