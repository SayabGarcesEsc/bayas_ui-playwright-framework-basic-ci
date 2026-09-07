import { Page, Locator } from '@playwright/test';

export class LoginPage {
  private readonly page: Page;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;
  private readonly successHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    // Deep practice: Use accessible, text-based queries instead of fragile CSS/XPaths
    this.usernameInput = page.getByRole('textbox', { name: /user|email/i });
    this.passwordInput = page.getByRole('textbox', { name: /password/i });
    this.loginButton = page.getByRole('button', { name: /log in|submit/i });
    this.errorMessage = page.locator('.alert-danger, [data-testid="error"]'); 
    this.successHeader = page.getByRole('heading', { name: /dashboard|welcome/i });
  }

  async navigate() {
    // Navigates to a public demo testing site
    await this.page.goto('/login');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessageText(): Promise<string> {
    return await this.errorMessage.textContent() ?? '';
  }

  async isSuccessHeaderVisible(): Promise<boolean> {
    return await this.successHeader.isVisible();
  }
}
