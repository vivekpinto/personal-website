import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/Homepage';
import { Navigation } from '../components/navigation';

type Fixtures = {
  homePage: HomePage;
  navigation: Navigation;
};

export const test = base.extend<Fixtures>({
  navigation: async ({ page }, use) => {
    const navigation = new Navigation(page);

    await use(navigation);
  },

  homePage: async ({ page, navigation }, use) => {
    const homePage = new HomePage(page, navigation);

    await use(homePage);
  },
});

export { expect };