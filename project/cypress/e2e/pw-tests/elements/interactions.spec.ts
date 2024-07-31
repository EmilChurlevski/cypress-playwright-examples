import { expect, test } from '@playwright/test';
import {
  ButtonSelectors,
  CheckboxSelectors,
  RadioButtonsSelectors,
  WebTableSelectors
} from '../../../../helpers/selectors/elements';

test('checks a checkbox', async ({ page }) => {
  await page.goto('/checkbox');

  // checkbox is checked or unchecked
  await expect(page.locator(CheckboxSelectors.LABEL)).not.toBeChecked();
  await page.locator(CheckboxSelectors.LABEL).click();
  await expect(page.locator(CheckboxSelectors.LABEL)).toBeChecked();

  // element exists or does not exist
  await expect(page.locator(CheckboxSelectors.RESULT)).toHaveCount(1);
  // await expect(page.locator('div#result')).toHaveCount(0); if the element does not exist
});

test('interacts with the radio buttons', async ({ page }) => {
  await page.goto('/radio-button');

  // checks the yes radio button
  await page.locator(RadioButtonsSelectors.LABEL, { hasText: 'Yes' }).check();
  await expect(page.locator(RadioButtonsSelectors.LABEL, { hasText: 'Yes' })).toBeChecked();

  // the no radio button should be disabled
  await expect(page.locator(RadioButtonsSelectors.LABEL, { hasText: 'No' })).toBeDisabled();
});

test('performs search on the table', async ({ page }) => {
  await page.goto('/webtables');

  // searches for cierra
  await page.locator(WebTableSelectors.SEARCH_BOX_INPUT).fill('cierra');
  await expect(page.locator(WebTableSelectors.TABLE_CELL).first()).toContainText('Cierra');
});

test('clicks test', async ({ page }) => {
  await page.goto('/buttons');

  // double click
  await page.locator(ButtonSelectors.DB_CLICK_BTN).dblclick();
  await expect(page.locator(ButtonSelectors.DB_CLICK_MSG)).toContainText('You have done a double click');

  // right click
  await page.locator(ButtonSelectors.RIGHT_CLICK_BTN).click({ button: 'right' });
  await expect(page.locator(ButtonSelectors.RIGHT_CLICK_MSG)).toContainText('You have done a right click');

  // normal click
  await page.locator(ButtonSelectors.NORMAL_CLICK_BTN).last().click();
  await expect(page.locator(ButtonSelectors.NORMAL_CLICK_MSG)).toContainText('You have done a dynamic click');
});