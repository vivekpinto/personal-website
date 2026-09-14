import {test, expect, Page, Locator} from '@playwright/test';

export class CompanyLink {
    readonly page: Page;
    readonly companyZeusLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.companyZeusLink = page.getByRole('link', {
            name: 'Zeus Learning',
            exact: true,
        });

    }

    async clickZeusLink() {
        await this.companyZeusLink.click();
    }


}