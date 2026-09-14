import { test as base, expect , Page} from '@playwright/test';
import { HomePage } from '../pages/Homepage';
import { Navigation } from '../components/navigation';
import {CompanyLink} from '../components/companyLink';

type Fixtures = {
  homePage: HomePage;
  navigation: Navigation;
  companyLink: CompanyLink;
  openExternalPage: (
      linkName: string,
      expectedUrl: string
    ) => Promise<Page>;
  openZeusPage: () => Promise<Page>;
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

  companyLink: async ({ page }, use) => {
    const companyLink = new CompanyLink(page);

    await use(companyLink);
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

  openZeusPage: async ({ context }, use) => {
    const openZeusPage = async (): Promise<Page> => {
        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
        ]);

        await newPage.waitForLoadState('domcontentloaded');

        return newPage;
    };

    await use(openZeusPage);
},

});

export { expect };