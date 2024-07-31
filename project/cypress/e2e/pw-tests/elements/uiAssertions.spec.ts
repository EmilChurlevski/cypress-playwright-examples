import { test, expect } from '@playwright/test';
import { TextBoxSelectors } from '../../../../helpers/selectors/elements';

test('makes assertions on the page', async ({ page }) => {
  await page.goto('/text-box');

  // text assertion
  // element should be visible assertion
  await expect(page.locator(TextBoxSelectors.H1_HEADER)).toContainText('Text Box');
  await expect(page.locator(TextBoxSelectors.H1_HEADER)).toHaveText('Text Box');
  await expect(page.locator(TextBoxSelectors.H1_HEADER)).toBeVisible();

  // check length of elements
  await expect(page.locator(TextBoxSelectors.INPUT_FIELD)).toHaveCount(2);

  // check attribute, property and class of element
  await expect(page.locator(TextBoxSelectors.INPUT_FIELD).first()).toHaveJSProperty('placeholder', 'Full Name');
  await expect(page.locator(TextBoxSelectors.FORM).first()).toHaveAttribute('id', 'userForm');
  await expect(page.locator(TextBoxSelectors.INPUT_FIELD).first()).toHaveClass(/form-control/);

  // check css of element
  await expect(page.locator(TextBoxSelectors.SUBMIT_BTN)).toHaveCSS('color', 'rgb(255, 255, 255)');
  await expect(page.locator(TextBoxSelectors.SUBMIT_BTN)).toHaveCSS('background-color', 'rgb(0, 123, 255)');
});