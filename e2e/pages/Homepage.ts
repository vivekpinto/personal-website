import { type Locator, type Page } from '@playwright/test';
import { Navigation } from '../components/navigation';

export class HomePage {
  readonly page: Page;
  readonly navigation: Navigation;

  readonly projectsHeading: Locator;
  readonly experienceHeading: Locator;

  constructor(page: Page, navigation: Navigation) {
    this.page = page;
    this.navigation = navigation;

    this.experienceHeading = page.getByRole('heading', {
      name: 'Professional Experience',
      exact: true,
    });

    this.projectsHeading = page.getByRole('heading', {
      name: 'Key Projects',
      exact: true,
    });
  }

  async goto() {
    await this.page.goto('./');
  }

    async goToExperience() {
    await this.navigation.goToExperience();
  }

  async goToProjects() {
    await this.navigation.goToProjects();
  }

}