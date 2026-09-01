import { type Locator, type Page } from '@playwright/test';

export class Navigation {
  readonly page: Page;

  readonly experienceLink: Locator;
  readonly projectsLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.experienceLink = page.getByRole('link', {
      name: 'Experience',
      exact: true,
    });

    this.projectsLink = page.getByRole('link', {
      name: 'Projects',
      exact: true,
    });
  }

  async goToExperience() {
    await this.experienceLink.click();
  }

   async goToProjects() {
    await this.projectsLink.click();
  }
}