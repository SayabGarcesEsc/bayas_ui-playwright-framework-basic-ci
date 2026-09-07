import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true, // Run test files simultaneously for speed
  forbidOnly: !!process.env.CI, // Fails build if test.only gets accidentally pushed
  retries: process.env.CI ? 2 : 0, // Flaky tests auto-retry twice in CI environment
  workers: process.env.CI ? 2 : undefined,
  reporter: [['html'], ['list']], // Generates comprehensive local and terminal logs
  
  use: {
    baseURL: 'https://practice.expandtesting.com',
    headless: true, // Required for clean background CI execution
    trace: 'retain-on-failure', // Deep diagnostics: record actions, network logs, and DOM snapshots ONLY if a test fails
    screenshot: 'only-on-failure', // Attaches context validation visual proofs to CI
    video: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
});
