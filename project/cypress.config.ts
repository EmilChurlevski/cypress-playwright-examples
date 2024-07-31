import { defineConfig } from "cypress";

export default defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  watchForFileChanges: false,
  downloadsFolder: 'downloads',
  screenshotOnRunFailure: true,
  e2e: {
    baseUrl: 'https://demoqa.com',
    testIsolation: true,
    setupNodeEvents(on, config) {
      return config;
    },
  },
});