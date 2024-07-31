import { test, expect } from '@playwright/test';
import { AlertSelectors } from '../../../../helpers/selectors/alertsFrameWindow';
import { DataGenerator } from '../../../../helpers/functions/dataGenerator';

test.describe('Window alerts tests', () => {

  test('should trigger an alert', async ({ page }) => {
    await page.goto('alerts');
    page.on('dialog', dialog => {
      expect(dialog.message()).toContain('You clicked a button');
      dialog.accept();
    });
    await page.locator(AlertSelectors.ALERT_BUTTON).click();
  });

  test('should trigger a delayed alert', async ({ page }) => {
    await page.goto('alerts');
    page.on('dialog', dialog => {
      expect(dialog.message()).toContain('This alert appeared after 5 seconds');
      dialog.accept();
    });
    await page.locator(AlertSelectors.TIMER_ALERT_BUTTON).click();
    await page.waitForTimeout(5000);
  });

  test('should trigger a confirmation alert and confirm it', async ({ page }) => {
    await page.goto('alerts');
    page.on('dialog', dialog => {
      expect(dialog.message()).toContain('Do you confirm action?');
      dialog.accept();
    });
    await page.locator(AlertSelectors.CONFIRM_ALERT_BUTTON).click();
    await expect(page.locator(AlertSelectors.CONFIRM_RESULT)).toContainText('You selected Ok');
  });

  test('should trigger a confirmation alert and decline it', async ({ page }) => {
    await page.goto('alerts');
    page.on('dialog', dialog => {
      expect(dialog.message()).toContain('Do you confirm action?');
      dialog.dismiss();
    });
    await page.locator(AlertSelectors.CONFIRM_ALERT_BUTTON).click();
    await expect(page.locator(AlertSelectors.CONFIRM_RESULT)).toContainText('You selected Cancel');
  });

  test('triggers a prompt and returns a random name', async ({ page }) => {
    const name: string = DataGenerator.getRandomName();
    await page.goto('alerts');
    page.on('dialog', dialog => {
      expect(dialog.message()).toContain('Please enter your name');
      dialog.accept(name);
    });
    await page.locator(AlertSelectors.PROMPT_BUTTON).click();
    await expect(page.locator(AlertSelectors.PROMPT_RESULT)).toContainText(`You entered ${name}`);
  });

});