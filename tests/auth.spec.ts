import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Authentication Matrix - Public Web Page Tests', () => {
  let loginPage: LoginPage;

  // Runs before every individual test scenario
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  /**
   * HAPPY PATHS (Expected positive behavior)
   */

  test('Scenario 1: Successful login with valid credentials', async ({ page }) => {
    // Act
    await loginPage.login('user@example.com', 'correctPassword123');

    // Assert (Web-First Assertions automatically retry up to 5 seconds)
    await expect(page).toHaveURL(/.*dashboard|.*account/);
    const isLogged = await loginPage.isSuccessHeaderVisible();
    expect(isLogged).toBe(true);
  });

  test('Scenario 2: UI Responsiveness and Element Visibility', async () => {
    // Asserting layout state before interaction
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeEditable();
    await expect(loginPage.loginButton).toBeEnabled();
  });

  test('Scenario 3: Visual State - Password masking verification', async () => {
    // Verify that the input hides plain text security values
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
  });

  /**
   * EXCEPTION PATHS (Error handling, boundaries, and validation checks)
   */

  test('Scenario 4: Failed login handles incorrect credentials gracefully', async () => {
    // Act - Providing incorrect user details
    await loginPage.login('wronguser@domain.com', 'badPassword');

    // Assert - Pipeline should expect a controlled UI error display
    const errorText = await loginPage.getErrorMessageText();
    expect(errorText).toContain('Invalid credentials'); 
    
    // Ensure we stayed on the login screen
    await expect(loginPage.successHeader).not.toBeVisible();
  });

  test('Scenario 5: Frontend validation prevents empty form submissions', async ({ page }) => {
    // Act - Intentionally bypass filling data and click submit directly
    await loginPage.login('', '');

    // Assert - Check HTML5 native verification or frontend custom alert flags
    const isFormInvalid = await loginPage.usernameInput.evaluate(
      (input: HTMLInputElement) => !input.checkValidity()
    );
    expect(isFormInvalid).toBe(true);
  });
});
