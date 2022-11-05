import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents() {
      // implement node event listeners here
    },
  },
  chromeWebSecurity: false,
  viewportWidth: 1280,
  viewportHeight: 800,
});
