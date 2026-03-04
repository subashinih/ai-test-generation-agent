
import { test } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';

test('Login - Test 3', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  await loginPage.goto();
  await loginPage.login('','');
  await loginPage.expectError();
});
