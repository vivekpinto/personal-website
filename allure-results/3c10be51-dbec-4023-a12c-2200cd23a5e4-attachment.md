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
Error: page.waitForEvent: Test timeout of 30000ms exceeded.
=========================== logs ===========================
waiting for event "popup"
============================================================
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - link "Skip to main content" [ref=e2] [cursor=pointer]:
    - /url: "#main-content"
  - generic [ref=e3]: Opens in a new tab
  - generic [ref=e4]: Drag with one pointer to move the chatbot. Click this control without dragging to move it to the next screen corner. Keyboard users can focus this control and use arrow keys to move it. Hold Shift with arrow keys to move farther. Press Home to reset its position.
  - banner [ref=e5]:
    - generic [ref=e6]:
      - link "Vivek Pinto" [ref=e7] [cursor=pointer]:
        - /url: "#home"
      - navigation "Main Navigation" [ref=e8]:
        - list [ref=e9]:
          - listitem [ref=e10]:
            - link "Home" [ref=e11] [cursor=pointer]:
              - /url: "#home"
          - listitem [ref=e12]:
            - link "Experience" [ref=e13] [cursor=pointer]:
              - /url: "#experience"
          - listitem [ref=e14]:
            - link "Education" [ref=e15] [cursor=pointer]:
              - /url: "#education"
          - listitem [ref=e16]:
            - link "Projects" [ref=e17] [cursor=pointer]:
              - /url: "#projects"
          - listitem [ref=e18]:
            - link "Skills" [ref=e19] [cursor=pointer]:
              - /url: "#skills"
          - listitem [ref=e20]:
            - link "Contact" [ref=e21] [cursor=pointer]:
              - /url: "#contact"
  - main [ref=e22]:
    - generic [ref=e24]:
      - generic [ref=e25]:
        - heading "Vivek Pinto" [level=1] [ref=e26]
        - paragraph [ref=e27]: Quality Engineer with 3 plus years of experience in Manual, Accessibility, and Automation Testing, automating 150 plus test cases and delivering accessible digital experiences with 95% and more WCAG conformance.
        - generic [ref=e28]:
          - link "Let's Connect" [ref=e29] [cursor=pointer]:
            - /url: "#contact"
          - link "View Experience" [ref=e30] [cursor=pointer]:
            - /url: "#experience"
      - img "Vivek Pinto's avatar" [ref=e34]
    - generic [ref=e36]:
      - heading "Professional Experience" [level=2] [ref=e37]
      - generic [ref=e41]:
        - article [ref=e42]:
          - generic [ref=e43]:
            - generic [ref=e44]:
              - heading "Senior Quality Engineer and Accessibility Specialist" [level=3] [ref=e45]
              - link "Zeus Learning" [active] [ref=e46] [cursor=pointer]:
                - /url: https://zeuslearning.com/
            - generic [ref=e51]:
              - time [ref=e52]: Jun 2023 - Aug 2026
              - generic [ref=e53]: Mumbai, Maharashtra
          - list [ref=e54]:
            - listitem [ref=e55]:
              - paragraph [ref=e58]: Designed and executed 200+ test cases and developed 150+ Playwright scripts, expanding regression coverage by 40%.
            - listitem [ref=e59]:
              - paragraph [ref=e62]: Led comprehensive WCAG 2.2 AA audits using NVDA, JAWS, VoiceOver, and TalkBack.
            - listitem [ref=e63]:
              - paragraph [ref=e66]: Identified and remediated 100+ accessibility barriers, achieving 95%+ compliance across enterprise platforms.
            - listitem [ref=e67]:
              - paragraph [ref=e70]: Partnered with designers and developers to reduce post-release defects by 35% through shift-left testing.
        - article [ref=e71]:
          - generic [ref=e72]:
            - generic [ref=e73]:
              - heading "Digital Evaluator" [level=3] [ref=e74]
              - link "Accessible Community" [ref=e75] [cursor=pointer]:
                - /url: https://accessiblecommunity.org/
            - generic [ref=e80]:
              - time [ref=e81]: Sep 2025 - Present
              - generic [ref=e82]: Remote
          - list [ref=e83]:
            - listitem [ref=e84]:
              - paragraph [ref=e87]: Contributing to global accessibility initiatives by evaluating digital products and advising on inclusive design enhancements.
            - listitem [ref=e88]:
              - paragraph [ref=e91]: Develop accessibility-focused technical content covering key topics such as ARIA, accessible names and descriptions, semantic HTML, keyboard accessibility, and WCAG guidelines.
    - generic [ref=e93]:
      - heading "QA Automation" [level=2] [ref=e94]
      - paragraph [ref=e98]: This portfolio is tested using a Playwright end-to-end automation framework. The test suite validates key user journeys, navigation, content, and external links.
      - generic "Automated test coverage" [ref=e99]:
        - generic [ref=e100]:
          - generic [ref=e101]:
            - generic [ref=e102]: "17"
            - generic [ref=e103]: Total Tests
          - generic [ref=e104]:
            - generic [ref=e105]: "7"
            - generic [ref=e106]: Automated
          - generic [ref=e107]:
            - generic [ref=e108]: "10"
            - generic [ref=e109]: Planned
          - generic [ref=e110]:
            - generic [ref=e111]: 41%
            - generic [ref=e112]: Automation Coverage
        - generic [ref=e113]:
          - article [ref=e114]:
            - generic [ref=e115]:
              - generic [ref=e116]:
                - heading "Navigation" [level=3] [ref=e117]
                - paragraph [ref=e118]: Verifies that visitors can navigate through the main sections of the portfolio.
              - generic [ref=e119]: 3/5
            - list [ref=e120]:
              - listitem [ref=e121]:
                - generic [ref=e122]: ✓
                - generic [ref=e123]: Home navigation
              - listitem [ref=e124]:
                - generic [ref=e125]: ✓
                - generic [ref=e126]: Experience navigation
              - listitem [ref=e127]:
                - generic [ref=e128]: ✓
                - generic [ref=e129]: Projects navigation
              - listitem [ref=e130]:
                - generic [ref=e131]: ○
                - generic [ref=e132]: Contact navigation
              - listitem [ref=e133]:
                - generic [ref=e134]: ○
                - generic [ref=e135]: Resume navigation
          - article [ref=e136]:
            - generic [ref=e137]:
              - generic [ref=e138]:
                - heading "Experience" [level=3] [ref=e139]
                - paragraph [ref=e140]: Verifies that professional experience information is displayed correctly.
              - generic [ref=e141]: 2/3
            - list [ref=e142]:
              - listitem [ref=e143]:
                - generic [ref=e144]: ✓
                - generic [ref=e145]: Experience section is visible
              - listitem [ref=e146]:
                - generic [ref=e147]: ✓
                - generic [ref=e148]: Experience heading is displayed
              - listitem [ref=e149]:
                - generic [ref=e150]: ○
                - generic [ref=e151]: Experience content is available
          - article [ref=e152]:
            - generic [ref=e153]:
              - generic [ref=e154]:
                - heading "Projects" [level=3] [ref=e155]
                - paragraph [ref=e156]: Verifies that project information and project links are available.
              - generic [ref=e157]: 2/4
            - list [ref=e158]:
              - listitem [ref=e159]:
                - generic [ref=e160]: ✓
                - generic [ref=e161]: Projects section is visible
              - listitem [ref=e162]:
                - generic [ref=e163]: ✓
                - generic [ref=e164]: Project cards are displayed
              - listitem [ref=e165]:
                - generic [ref=e166]: ○
                - generic [ref=e167]: Project titles are displayed
              - listitem [ref=e168]:
                - generic [ref=e169]: ○
                - generic [ref=e170]: Project links are available
          - article [ref=e171]:
            - generic [ref=e172]:
              - generic [ref=e173]:
                - heading "Resume" [level=3] [ref=e174]
                - paragraph [ref=e175]: Verifies that visitors can access the resume.
              - generic [ref=e176]: 0/2
            - list [ref=e177]:
              - listitem [ref=e178]:
                - generic [ref=e179]: ○
                - generic [ref=e180]: Resume link is visible
              - listitem [ref=e181]:
                - generic [ref=e182]: ○
                - generic [ref=e183]: Resume has the correct accessible name
          - article [ref=e184]:
            - generic [ref=e185]:
              - generic [ref=e186]:
                - heading "External Links" [level=3] [ref=e187]
                - paragraph [ref=e188]: Verifies that important external links are reachable.
              - generic [ref=e189]: 0/3
            - list [ref=e190]:
              - listitem [ref=e191]:
                - generic [ref=e192]: ○
                - generic [ref=e193]: GitHub link
              - listitem [ref=e194]:
                - generic [ref=e195]: ○
                - generic [ref=e196]: LinkedIn link
              - listitem [ref=e197]:
                - generic [ref=e198]: ○
                - generic [ref=e199]: Email link
      - status [ref=e200]:
        - generic [ref=e201]:
          - heading "Latest Automation Run" [level=3] [ref=e202]
          - generic [ref=e203]:
            - generic [ref=e204]: ✕
            - generic [ref=e205]:
              - strong [ref=e206]: Failed
              - paragraph [ref=e207]: 4 of 5 tests passed
          - generic [ref=e208]:
            - generic [ref=e209]:
              - generic [ref=e210]: Passed
              - generic [ref=e211]: "4"
            - generic [ref=e212]:
              - generic [ref=e213]: Failed
              - generic [ref=e214]: "1"
            - generic [ref=e215]:
              - generic [ref=e216]: Skipped
              - generic [ref=e217]: "0"
            - generic [ref=e218]:
              - generic [ref=e219]: Timed Out
              - generic [ref=e220]: "0"
            - generic [ref=e221]:
              - generic [ref=e222]: Pass Rate
              - generic [ref=e223]: 80%
            - generic [ref=e224]:
              - generic [ref=e225]: Last Run
              - generic [ref=e226]: 9/10/2026, 10:41:16 AM
          - generic [ref=e227]:
            - button "▶ Run Automation Tests" [ref=e228]
            - link "📊 View Allure Report" [ref=e229] [cursor=pointer]:
              - /url: https://vivekpinto.github.io/personal-website/test-report/?v=2026-09-10T05%3A11%3A16.615Z
    - generic [ref=e231]:
      - heading "Education" [level=2] [ref=e232]
      - article [ref=e236]:
        - generic [ref=e237]:
          - generic [ref=e238]:
            - heading "St. Francis Institute of Technology" [level=3] [ref=e239]
            - paragraph [ref=e240]: B.E. Computer Engineering
          - generic [ref=e241]:
            - time [ref=e242]: June 2019 - May 2023
            - generic [ref=e243]: Mumbai, Maharashtra
        - list [ref=e244]:
          - listitem [ref=e245]:
            - paragraph [ref=e248]: Completed Bachelor of Engineering in Computer Engineering with a CGPA of 7.92.
    - generic [ref=e250]:
      - heading "Key Projects" [level=2] [ref=e251]
      - generic [ref=e255]:
        - article [ref=e256]:
          - heading "Playwright Automation Framework" [level=3] [ref=e257]
          - paragraph [ref=e258]: Internal Framework - 2024
          - paragraph [ref=e259]: Developed a modular automation framework using TypeScript, improving regression speed by 30% and supporting CI/CD integration.
          - generic [ref=e260]:
            - generic [ref=e261]: "Technologies used:"
            - generic [ref=e262]: TypeScript
            - generic [ref=e263]: Playwright
            - generic [ref=e264]: Agile
        - article [ref=e265]:
          - heading "Enterprise LMS Overhaul" [level=3] [ref=e266]
          - paragraph [ref=e267]: Major EdTech Client - 2024 to 2025
          - paragraph [ref=e268]: Led full accessibility audit for an LMS with 100k+ users. Documented 150+ violations to achieve AA compliance within 6 months.
          - generic [ref=e269]:
            - generic [ref=e270]: "Technologies used:"
            - generic [ref=e271]: WCAG 2.2
            - generic [ref=e272]: Accessibility testing
            - generic [ref=e273]: Audit
            - generic [ref=e274]: Remediation
        - article [ref=e275]:
          - heading "ENTERPRISE ACCESSIBILITY INTEGRATION" [level=3] [ref=e276]
          - paragraph [ref=e277]: Major EdTech Client – 2025 to 2026
          - paragraph [ref=e278]: Led a Shift-Left Accessibility strategy across UX, development, QA, and product teams. Achieved 95–98% accessibility compliance before the final ACR audit, with only 2–5% minor issues identified during assessment.
          - generic [ref=e279]:
            - generic [ref=e280]: "Technologies used:"
            - generic [ref=e281]: Shift-Left
            - generic [ref=e282]: Design Review
            - generic [ref=e283]: WCAG 2.2
            - generic [ref=e284]: Accessibility testing
            - generic [ref=e285]: Remediation
    - generic [ref=e287]:
      - generic [ref=e288]:
        - heading "Technical Skills" [level=2] [ref=e289]
        - paragraph [ref=e290]: Expertise across accessibility standards, automated testing, and development tools.
      - generic [ref=e291]:
        - region [ref=e292]:
          - heading "Accessibility" [level=3] [ref=e293]
          - list [ref=e294]:
            - listitem [ref=e295]: WCAG 2.2 & Section 508
            - listitem [ref=e296]: Axe DevTools & Insights
            - listitem [ref=e297]: NVDA, JAWS, VoiceOver
            - listitem [ref=e298]: PDF/UA Remediation
        - region [ref=e299]:
          - heading "Automation" [level=3] [ref=e300]
          - list [ref=e301]:
            - listitem [ref=e302]: Playwright
            - listitem [ref=e303]: TypeScript & JavaScript
            - listitem [ref=e304]: CI/CD Pipelines
            - listitem [ref=e305]: Regression Testing
        - region [ref=e306]:
          - heading "Development" [level=3] [ref=e307]
          - list [ref=e308]:
            - listitem [ref=e309]: HTML5 & CSS3
            - listitem [ref=e310]: WAI-ARIA
            - listitem [ref=e311]: Responsive Design
            - listitem [ref=e312]: Git & GitHub
    - generic [ref=e314]:
      - heading "Let's build something inclusive." [level=2] [ref=e315]
      - paragraph [ref=e316]: I'm currently open to networking and new challenges in QA or accessibility-focused roles.
      - generic [ref=e317]:
        - link "Email" [ref=e318] [cursor=pointer]:
          - /url: mailto:vivekpinto5@gmail.com
        - link "LinkedIn" [ref=e323] [cursor=pointer]:
          - /url: https://linkedin.com/in/vivekpinto2001
        - link "GitHub" [ref=e333] [cursor=pointer]:
          - /url: https://github.com/vivekpinto
        - link "Resume" [ref=e342] [cursor=pointer]:
          - /url: Vivek_Pinto-Resume2026.pdf
  - complementary "Ask Vivek assistant":
    - generic [ref=e351]:
      - button "Ask Vivek" [ref=e352] [cursor=pointer]
      - button "Move Ask Vivek button" [ref=e355]
  - contentinfo [ref=e361]:
    - generic [ref=e362]:
      - generic [ref=e363]:
        - paragraph [ref=e364]: Vivek Pinto
        - paragraph [ref=e365]: Empowering Web Accessibility through QA.
      - paragraph [ref=e366]: © 2026 - High-performance, Accessible Portfolio.
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
  24 |     page.getByRole('link', { name: 'Zeus Learning' }).click(),
  25 |   ]);
  26 | 
> 27 |   await newPage.waitForEvent('popup');
     |                 ^ Error: page.waitForEvent: Test timeout of 30000ms exceeded.
  28 | 
  29 |   await expect(newPage).toHaveURL('https://zeuslearning.com/');
  30 | 
  31 |   await page.goBack();
  32 | });
  33 |     // await expect(newPage.getByRole('link', {name: 'Zeus Learning', exact: true})).toBeVisible();
  34 |     // await page.getByRole('link', {name: 'Zeus Learning', exact: true}).click();
  35 |     // await page.waitForEvent('popup');
  36 |     // await expect(page).toHaveURL('https://zeuslearning.com/');
  37 |     // await page.goBack();
  38 |     // await expect(page.getByRole('link', {name: 'Accessible Community', exact: true})).toBeVisible();
  39 |     // await page.getByRole('link', {name: 'Accessible Community', exact: true}).click();
  40 |     // await page.waitForEvent('popup');
  41 |     // await expect(page).toHaveURL('https://accessiblecommunity.org/');
  42 |     // await page.goBack();
  43 | });
  44 | 
```