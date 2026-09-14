import { type Locator, type Page } from '@playwright/test';

export class Experience {
    readonly page: Page;

    readonly ZeusHeading: Locator;
    readonly AccessibleCommunityHeading: Locator;

    constructor(page: Page) {
    this.page = page;

    this.ZeusHeading = this.page.getByRole('heading',{
        name: 'Senior Quality Engineer and Accessibility Specialist',
        exact: true
    })

    this.AccessibleCommunityHeading = this.page.getByRole('heading',{
        name: 'Digital Evaluator',
        exact: true
    })


    }



}