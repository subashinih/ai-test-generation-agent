import fs from 'fs';
import path from 'path';

export interface TestCase {
  testName: string;
  steps: string[];
}

 //Reads acceptanceCriteria JSON and converts to TestCases
 
export function planTests(jsonPath: string): TestCase[] {
  const raw = fs.readFileSync(path.resolve(jsonPath), 'utf-8');
  const data = JSON.parse(raw);

  if (!data.acceptanceCriteria) {
    throw new Error('JSON must have acceptanceCriteria array');
  }

  return data.acceptanceCriteria.map((criteria: string, index: number) => ({
    testName: `Login - Test ${index + 1}`,
    steps: [criteria] // each criterion becomes one test
  }));
}