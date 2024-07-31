import { test, expect } from '@playwright/test';
import { WindowsSelectors } from '../../../../helpers/selectors/alertsFrameWindow';

test.describe('Browser windows tests', () => {

  test('checks the new opened tab', async ({ context }) => {
    const page = await context.newPage();
    await page.goto('/browser-windows');
    const pagePromise = context.waitForEvent('page');
    await page.locator(WindowsSelectors.TAB_BUTTON).click();
    const newPage = await pagePromise;
    expect(newPage.url()).toContain('/sample');
  });

  // the same test can be used for new window
  test('checks the new window', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('/browser-windows');
    const pagePromise = context.waitForEvent('page');
    await page.locator(WindowsSelectors.NEW_WINDOW_BUTTON).click();
    const newPage = await pagePromise;
    expect(newPage.url()).toContain('/sample');
  });

  test('checks the new message', async ({ browser }) => {
    const text = 'Knowledge increases by sharing but not by saving. Please share this website with your friends and in your organization.';
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('/browser-windows');
    const pagePromise = context.waitForEvent('page');
    await page.locator(WindowsSelectors.NEW_WINDOW_MSG_BUTTON).click();
    const newPage = await pagePromise;
    await expect(newPage.locator('body')).toContainText(text);
  });
});