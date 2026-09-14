import { type Locator, type Page } from '@playwright/test';
import { Navigation } from '../components/navigation';

export class HomePage {
  readonly page: Page;
  readonly navigation: Navigation;

  readonly projectsHeading: Locator;
  readonly experienceHeading: Locator;
  readonly skillsHeading: Locator;
  readonly contactsHeading: Locator;
  readonly educationHeading: Locator;

  constructor(page: Page, navigation: Navigation) {
    this.page = page;
    this.navigation = navigation;

    this.skillsHeading = page.getByRole('heading', {
      name: 'Professional Experience',
      exact: true,
    });

    this.contactsHeading = page.getByRole('heading', {
      name: 'Professional Experience',
      exact: true,
    });

    this.educationHeading = page.getByRole('heading', {
      name: 'Professional Experience',
      exact: true,
    });

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

  async goToSkills() {
    await this.navigation.goToSkills();
  }

  async goToEducation(){
    await this.navigation.goToEducation();
  }

  async goToContacts(){
    await this.navigation.goToContacts();
  }

}