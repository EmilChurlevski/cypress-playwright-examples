import { test, expect } from '@playwright/test';
import { Student } from '../../../../helpers/models/student';
import { FormHelpers } from '../../../../helpers/functions/formHelpers';
import { PwFormHelper } from '../../../../pw-helpers/pwFormHelper';
import { FormSelectors } from '../../../../helpers/selectors/forms';

test.describe('Form validation tests', () => {

  test('should successfully submit the form with min requirements', async ({ page }) => {
    const student: Student = FormHelpers.getRandomStudentMinRequirements();
    await page.goto('/automation-practice-form');
    const pwFormHelpers = new PwFormHelper(page);
    await pwFormHelpers.fillFormMinRequirements(student);
    await page.locator(FormSelectors.SUBMIT_BUTTON).click();
    await expect(page.locator(FormSelectors.MODAL)).toBeVisible();
    await pwFormHelpers.validateForm(student, 'minReq');
  });

  test('should successfully submit the form with complete data', async ({ page }) => {
    const student: Student = FormHelpers.getRandomStudentFullData();
    await page.goto('/automation-practice-form');
    const pwFormHelpers = new PwFormHelper(page);
    await pwFormHelpers.fillFormAllFields(student);
    await page.locator(FormSelectors.SUBMIT_BUTTON).click();
    await expect(page.locator(FormSelectors.MODAL)).toBeVisible();
    await pwFormHelpers.validateForm(student, 'fullReq');
  });

  test('should not be able to submit the form without required data', async ({ page }) => {
    const student: Student = FormHelpers.getRandomStudentMinRequirements();
    await page.goto('/automation-practice-form');
    const pwFormHelpers = new PwFormHelper(page);
    await pwFormHelpers.fillFormMinRequirements(student);
    await page.locator(FormSelectors.PHONE_NUMBER_INPUT).clear();
    await page.locator(FormSelectors.SUBMIT_BUTTON).click();
    await expect(page.locator(FormSelectors.MODAL)).toHaveCount(0);
    await expect(page.locator(FormSelectors.PHONE_NUMBER_INPUT)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });
});