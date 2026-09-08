# bayas_ui-playwright-framework-basic-ci

A lightweight UI testing framework built with Playwright and configured for continuous integration (CI) workflows.

## 🚀 Features

* **Fast Execution**: Parallel test execution out of the box with Playwright.
* **ONe-Browser**: Configured for Chromium.
* **CI/CD Ready**: Built-in configuration for GitHub Actions CI.
* **Reporting**: Detailed HTML test reports with screenshots and video attachments on failure.
* **Page Object Model (POM)**: Structured for scalable and maintainable test suites.

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:
* [Node.js](https://nodejs.org) (v24)
* npm (comes with Node.js)

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com
   cd bayas_ui-playwright-framework-basic-ci
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright browsers:**
   ```bash
   npx playwright install chrome
   ```

## 🧪 Running Tests

You can run your tests using the following scripts:

* **Run all tests (Headless mode):**
   ```bash
   npx playwright test
   ```

* **Run tests in headed mode (UI visible):**
   ```bash
   npx playwright test --headed
   ```

* **Run a specific test file:**
   ```bash
   npx playwright test tests/example.spec.js
   ```

* **Open Playwright UI Mode (Interactive debugging):**
   ```bash
   npx playwright test --ui
   ```

## 📊 Reports

After the tests complete, an HTML report is automatically generated. To view the latest report, run:

```bash
npx playwright show-report
```

## 🔄 CI/CD Pipeline

This framework is configured for continuous integration. 
* **GitHub Actions**: The pipeline is defined in `.github/workflows/playwright.yml`. It runs automatically on every `push` and `pull_request` to the `main` branch.
* **Artifacts**: Test reports and failure traces are saved as build artifacts for easy debugging.

## 📂 Project Structure

```text
├── .github/workflows/     # CI pipeline configurations
├── tests/                 # Test files (*.spec.js or *.spec.ts)
│   └── auth.spec.ts       # Sample UI test
├── pages/                 # Page Object Model classes
├── playwright.config.ts   # Playwright configuration file
├── package.json           # Project dependencies and scripts
└── README.md              # Project documentation
```
