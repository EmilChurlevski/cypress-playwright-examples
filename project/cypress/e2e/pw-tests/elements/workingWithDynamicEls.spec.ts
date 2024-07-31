import { test, expect } from '@playwright/test';
import { DynamicSelectors } from '../../../../helpers/selectors/elements';

test('waits for the button to be enabled', async ({ page }) => {
  await page.goto('dynamic-properties');
  const dynamicBtn = page.locator(DynamicSelectors.DYNAMIC_BTN);
  // initially
  await expect(dynamicBtn).toBeDisabled();

  // after 5 seconds
  await expect(dynamicBtn).toBeEnabled({ timeout: 5500 });
});

test('checks the css of a dynamic button', async ({ page }) => {
  await page.goto('dynamic-properties');
  const colorChangeBtn = page.locator(DynamicSelectors.COLOR_CHANGE_BTN);

  // initial
  await expect(colorChangeBtn).toHaveCSS('background-color', 'rgb(0, 123, 255)');
  await expect(colorChangeBtn).toHaveCSS('color', 'rgb(255, 255, 255)');

  // after 5 seconds
  await expect(colorChangeBtn).toHaveCSS('background-color', 'rgb(0, 123, 255)');
  await expect(colorChangeBtn).toHaveCSS('color', 'rgb(220, 53, 69)', { timeout: 6000 });
});

test('clicks on a button that appears after 5 seconds', async ({ page }) => {
  await page.goto('/dynamic-properties');
  await page.locator(DynamicSelectors.VISIBLE_AFTER_BTN).click({ timeout: 6000 });
});