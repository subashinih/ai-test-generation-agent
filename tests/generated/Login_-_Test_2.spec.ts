
import { test } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';

test('Login - Test 2', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  await loginPage.goto();
  await loginPage.login('wronguser','wrongpass');
  await loginPage.expectError();
});
