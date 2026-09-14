import {test, expect} from '../../fixtures/test-fixtures';


test('@smoke user can navigate throughout the page', async ({ homePage }) => {
   await homePage.goto();

   await homePage.goToExperience();
   await expect(homePage.experienceHeading).toBeVisible();
   
   await homePage.goToEducation();
   await expect(homePage.educationHeading).toBeVisible();
   
   await homePage.goToProjects();
   await expect(homePage.projectsHeading).toBeVisible();
   
   await homePage.goToSkills();
   await expect(homePage.skillsHeading).toBeVisible();
   
   await homePage.goToContacts();
   await expect(homePage.contactsHeading).toBeVisible();
});