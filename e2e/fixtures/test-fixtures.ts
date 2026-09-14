import { test as base, expect , Page} from '@playwright/test';
import { HomePage } from '../pages/Homepage';
import { Navigation } from '../components/navigation';

type Fixtures = {
  homePage: HomePage;
  navigation: Navigation;
  openExternalPage: (
      linkName: string,
      expectedUrl: string
    ) => Promise<Page>;
  openNewPage: () => Promise<Page>;
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

  openExternalPage: async ({ page, context }, use) => {

    const openExternalPage = async (
      linkName: string,
      expectedUrl: string
    ): Promise<Page> => {

      const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        page.getByRole('link', { name: linkName }).click(),
      ]);

      await newPage.waitForLoadState('domcontentloaded');

      await expect(newPage).toHaveURL(expectedUrl);

      return newPage;
    };

    await use(openExternalPage);
  },

});

export { expect };