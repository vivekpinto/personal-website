# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: functional\experience.spec.ts >> Experience >> @regression The links in the experience section are functional
- Location: e2e\tests\functional\experience.spec.ts:20:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: 'Zeus Learning', exact: true })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('link', { name: 'Zeus Learning', exact: true })

```

```yaml
- link "Skip to main content":
  - /url: "#main-content"
- text: Opens in a new tab Drag with one pointer to move the chatbot. Click this control without dragging to move it to the next screen corner. Keyboard users can focus this control and use arrow keys to move it. Hold Shift with arrow keys to move farther. Press Home to reset its position.
- banner:
  - link "Vivek Pinto":
    - /url: "#home"
  - navigation "Main Navigation":
    - list:
      - listitem:
        - link "Home":
          - /url: "#home"
      - listitem:
        - link "Experience":
          - /url: "#experience"
      - listitem:
        - link "Education":
          - /url: "#education"
      - listitem:
        - link "Projects":
          - /url: "#projects"
      - listitem:
        - link "Skills":
          - /url: "#skills"
      - listitem:
        - link "Contact":
          - /url: "#contact"
- main:
  - heading "Vivek Pinto" [level=1]
  - paragraph: Quality Engineer with 3 plus years of experience in Manual, Accessibility, and Automation Testing, automating 150 plus test cases and delivering accessible digital experiences with 95% and more WCAG conformance.
  - link "Let's Connect":
    - /url: "#contact"
  - link "View Experience":
    - /url: "#experience"
  - img "Vivek Pinto's avatar"
  - article:
    - heading "Professional Summary" [level=2]
    - paragraph:
      - text: Results-oriented Quality Assurance Engineer specializing in
      - strong: accessible EdTech product testing
      - text: . I embed accessibility into the QA lifecycle through WCAG 2.2 compliance, automated testing, and shift-left quality practices. I've delivered ten consecutive production releases with
      - strong: zero critical defects
      - text: while maintaining high accessibility standards.
  - heading "Professional Experience" [level=2]
  - article:
    - heading "Senior Quality Engineer and Accessibility Specialist" [level=3]
    - paragraph: Zeus Learning
    - time: Jun 2023 - Aug 2026
    - text: Mumbai, Maharashtra
    - list:
      - listitem:
        - paragraph: Designed and executed 200+ test cases and developed 150+ Playwright scripts, expanding regression coverage by 40%.
      - listitem:
        - paragraph: Led comprehensive WCAG 2.2 AA audits using NVDA, JAWS, VoiceOver, and TalkBack.
      - listitem:
        - paragraph: Identified and remediated 100+ accessibility barriers, achieving 95%+ compliance across enterprise platforms.
      - listitem:
        - paragraph: Partnered with designers and developers to reduce post-release defects by 35% through shift-left testing.
  - article:
    - heading "Digital Evaluator" [level=3]
    - paragraph: Accessible Community
    - time: Sep 2025 - Present
    - text: Remote
    - list:
      - listitem:
        - paragraph: Contributing to global accessibility initiatives by evaluating digital products and advising on inclusive design enhancements.
      - listitem:
        - paragraph: Develop accessibility-focused technical content covering key topics such as ARIA, accessible names and descriptions, semantic HTML, keyboard accessibility, and WCAG guidelines.
  - heading "QA Automation" [level=2]
  - paragraph: This portfolio is tested using a Playwright end-to-end automation framework. The test suite validates key user journeys, navigation, content, and external links.
  - text: 17 Total Tests 7 Automated 10 Planned 41% Automation Coverage
  - article:
    - heading "Navigation" [level=3]
    - paragraph: Verifies that visitors can navigate through the main sections of the portfolio.
    - text: 3/5
    - list:
      - listitem: Home navigation
      - listitem: Experience navigation
      - listitem: Projects navigation
      - listitem: Contact navigation
      - listitem: Resume navigation
  - article:
    - heading "Experience" [level=3]
    - paragraph: Verifies that professional experience information is displayed correctly.
    - text: 2/3
    - list:
      - listitem: Experience section is visible
      - listitem: Experience heading is displayed
      - listitem: Experience content is available
  - article:
    - heading "Projects" [level=3]
    - paragraph: Verifies that project information and project links are available.
    - text: 2/4
    - list:
      - listitem: Projects section is visible
      - listitem: Project cards are displayed
      - listitem: Project titles are displayed
      - listitem: Project links are available
  - article:
    - heading "Resume" [level=3]
    - paragraph: Verifies that visitors can access the resume.
    - text: 0/2
    - list:
      - listitem: Resume link is visible
      - listitem: Resume has the correct accessible name
  - article:
    - heading "External Links" [level=3]
    - paragraph: Verifies that important external links are reachable.
    - text: 0/3
    - list:
      - listitem: GitHub link
      - listitem: LinkedIn link
      - listitem: Email link
  - status:
    - heading "Latest Automation Run" [level=3]
    - strong: Failed
    - paragraph: 4 of 5 tests passed
    - text: Passed 4 Failed 1 Skipped 0 Timed Out 0 Pass Rate 80% Last Run 9/10/2026, 10:41:16 AM
    - button "▶ Run Automation Tests"
    - link "📊 View Allure Report":
      - /url: https://vivekpinto.github.io/personal-website/test-report/?v=2026-09-10T05%3A11%3A16.615Z
  - heading "Education" [level=2]
  - article "St. Francis Institute of Technology":
    - heading "St. Francis Institute of Technology" [level=3]
    - paragraph: B.E. Computer Engineering
    - time: June 2019 - May 2023
    - text: Mumbai, Maharashtra
    - list:
      - listitem:
        - paragraph: Completed Bachelor of Engineering in Computer Engineering with a CGPA of 7.92.
  - heading "Key Projects" [level=2]
  - article:
    - heading "Playwright Automation Framework" [level=3]
    - paragraph: Internal Framework - 2024
    - paragraph: Developed a modular automation framework using TypeScript, improving regression speed by 30% and supporting CI/CD integration.
    - text: "Technologies used: TypeScript Playwright Agile"
  - article:
    - heading "Enterprise LMS Overhaul" [level=3]
    - paragraph: Major EdTech Client - 2024 to 2025
    - paragraph: Led full accessibility audit for an LMS with 100k+ users. Documented 150+ violations to achieve AA compliance within 6 months.
    - text: "Technologies used: WCAG 2.2 Accessibility testing Audit Remediation"
  - article:
    - heading "ENTERPRISE ACCESSIBILITY INTEGRATION" [level=3]
    - paragraph: Major EdTech Client – 2025 to 2026
    - paragraph: Led a Shift-Left Accessibility strategy across UX, development, QA, and product teams. Achieved 95–98% accessibility compliance before the final ACR audit, with only 2–5% minor issues identified during assessment.
    - text: "Technologies used: Shift-Left Design Review WCAG 2.2 Accessibility testing Remediation"
  - heading "Technical Skills" [level=2]
  - paragraph: Expertise across accessibility standards, automated testing, and development tools.
  - region "Accessibility":
    - heading "Accessibility" [level=3]
    - list:
      - listitem: WCAG 2.2 & Section 508
      - listitem: Axe DevTools & Insights
      - listitem: NVDA, JAWS, VoiceOver
      - listitem: PDF/UA Remediation
  - region "Automation":
    - heading "Automation" [level=3]
    - list:
      - listitem: Playwright
      - listitem: TypeScript & JavaScript
      - listitem: CI/CD Pipelines
      - listitem: Regression Testing
  - region "Development":
    - heading "Development" [level=3]
    - list:
      - listitem: HTML5 & CSS3
      - listitem: WAI-ARIA
      - listitem: Responsive Design
      - listitem: Git & GitHub
  - heading "Let's build something inclusive." [level=2]
  - paragraph: I'm currently open to networking and new challenges in QA or accessibility-focused roles.
  - link "Email":
    - /url: mailto:vivekpinto5@gmail.com
  - link "LinkedIn":
    - /url: https://linkedin.com/in/vivekpinto2001
  - link "GitHub":
    - /url: https://github.com/vivekpinto
  - link "Resume":
    - /url: Vivek_Pinto-Resume2026.pdf
- complementary "Ask Vivek assistant":
  - button "Ask Vivek"
  - button "Move Ask Vivek button"
- contentinfo:
  - paragraph: Vivek Pinto
  - paragraph: Empowering Web Accessibility through QA.
  - paragraph: © 2026 - High-performance, Accessible Portfolio.
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
  20 |   test('@regression The links in the experience section are functional', async ({ page, homePage }) => {
  21 |     await homePage.goto();
> 22 |     await expect(page.getByRole('link', {name: 'Zeus Learning', exact: true})).toBeVisible();
     |                                                                                ^ Error: expect(locator).toBeVisible() failed
  23 |     await page.getByRole('link', {name: 'Zeus Learning', exact: true}).click();
  24 |     await page.waitForEvent('popup');
  25 |     await expect(page).toHaveURL('https://zeuslearning.com/');
  26 |     await page.goBack();
  27 |     await expect(page.getByRole('link', {name: 'Accessible Community', exact: true})).toBeVisible();
  28 |     await page.getByRole('link', {name: 'Accessible Community', exact: true}).click();
  29 |     await page.waitForEvent('popup');
  30 |     await expect(page).toHaveURL('https://accessiblecommunity.org/');
  31 |     await page.goBack();
  32 | });
  33 | });
```