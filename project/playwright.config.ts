import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './cypress/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'https://demoqa.com',
    screenshot: 'only-on-failure'
  },
  projects: [
    {
      name: 'chrome',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
});
