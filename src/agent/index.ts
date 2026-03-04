import { planTests } from './planner';
import { generateTestScripts } from './executor';
import { validateTestCases } from './validator';

console.log('Starting AI Test Agent');

const testCases = planTests('src/data/login_story.json');
validateTestCases(testCases);
generateTestScripts(testCases, 'tests/generated');

console.log('Test scripts generated in tests/generated/');