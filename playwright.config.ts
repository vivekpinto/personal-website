import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

const environment = process.env.TEST_ENV || 'local';

dotenv.config({
  path: `.env.${environment}`,
});

console.log(`Running tests against: ${environment}`);
console.log(`Base URL: ${process.env.BASE_URL}`);

export default defineConfig({
    testDir: './e2e/tests/',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: 2,
    workers: process.env.CI ? 1 : undefined,
     reporter: [
      ['html'],
      ['list'],
      ['json', { outputFile: 'test-results/playwright-results.json' }],
      ['allure-playwright'],
    ],


    use: {
        baseURL: process.env.BASE_URL,
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },

        // {
        //     name: 'firefox',
        //     use: { ...devices['Desktop Firefox'] },
        // },

        // {
        //     name: 'webkit',
        //     use: { ...devices['Desktop Safari'] },
        // },
    ],
});