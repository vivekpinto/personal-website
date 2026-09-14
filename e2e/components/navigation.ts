import { type Locator, type Page } from '@playwright/test';

export class Navigation {
  readonly page: Page;

  readonly experienceLink: Locator;
  readonly educationLink: Locator;
  readonly projectsLink: Locator;
  readonly skillsLink: Locator;
  readonly contactLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.experienceLink = page.getByRole('link', {
      name: 'Experience',
      exact: true,
    });

    this.educationLink = page.getByRole('link',{
      name: 'Education',
      exact: true,
    });

    this.projectsLink = page.getByRole('link', {
      name: 'Projects',
      exact: true,
    });

    this.skillsLink = page.getByRole('link', {
      name: 'Skills',
      exact: true,
    });

    this.contactLink = page.getByRole('link', {
      name: 'Contact',
      exact: true,
    });
  }

  async goToExperience() {
    await this.experienceLink.click();
  }

  async goToEducation(){
    await this.educationLink.click()
  }

  async goToProjects() {
    await this.projectsLink.click();
  }

  async goToSkills(){
    await this.skillsLink.click()
  }

  async goToContacts(){
    await this.contactLink.click()
  }


}