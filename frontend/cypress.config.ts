import { defineConfig } from "cypress"

export default defineConfig({
  projectId: "2y5zh4",
  // projectId: 'frontend',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
})
