import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true, // false,// Run test files simultaneously for speed
  forbidOnly: !!process.env.CI, // Fails build if test.only gets accidentally pushed
  retries: process.env.CI ? 2 : 0, // Flaky tests auto-retry twice in CI environment
  workers: process.env.CI ? 2 : undefined, // 1,//
  reporter: [['html'], ['list']], // Generates comprehensive local and terminal logs
  
  use: {
    baseURL: 'https://practice.expandtesting.com',
    headless: true, // Required for clean background CI execution
    trace: 'retain-on-failure', // 'off',// Deep diagnostics: record actions, network logs, and DOM snapshots ONLY if a test fails
    screenshot: 'only-on-failure', // 'off', // Attaches context validation visual proofs to CI
    video: 'on-first-retry', // 'off',//
    /*launchOptions: {
      args: [
        '--disable-dev-shm-usage',
        '--no-sandbox',
        '--js-flags="--max-old-space-size=512"'
      ],
    },*/
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },/*
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },*/
  ],
});
