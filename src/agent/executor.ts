import fs from 'fs';
import path from 'path';
import { TestCase } from './planner';

 // Generates Playwright POM-based test scripts
export function generateTestScripts(testCases: TestCase[], outputDir: string) {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  testCases.forEach(tc => {
    const fileName = path.join(outputDir, `${tc.testName.replace(/\s+/g, '_')}.spec.ts`);

    // Map step to POM actions
    let stepsCode = '';
    const step = tc.steps[0].toLowerCase();
    if (step.includes('valid username')) {
      stepsCode = `
  await loginPage.goto();
  await loginPage.login('tomsmith','SuperSecretPassword!');
  await loginPage.expectDashboard();`;
    } else if (step.includes('invalid credentials')) {
      stepsCode = `
  await loginPage.goto();
  await loginPage.login('wronguser','wrongpass');
  await loginPage.expectError();`;
    } else if (step.includes('empty fields')) {
      stepsCode = `
  await loginPage.goto();
  await loginPage.login('','');
  await loginPage.expectError();`;
    } else {
      stepsCode = `
  await loginPage.goto();
  // Step not mapped: ${tc.steps[0]}`;
    }

    const content = `
import { test } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';

test('${tc.testName}', async ({ page }) => {
  const loginPage = new LoginPage(page);
  ${stepsCode}
});
`;

    fs.writeFileSync(fileName, content, 'utf-8');
  });
}