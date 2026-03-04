
import { test } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';

test('Login - Test 1', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  await loginPage.goto();
  await loginPage.login('tomsmith','SuperSecretPassword!');
  await loginPage.expectDashboard();
});
