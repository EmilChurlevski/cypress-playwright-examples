import { test, expect } from '@playwright/test';
import { LinkSelectors } from '../../../../helpers/selectors/elements';

test('example 1', async ({ page }) => {
  // check if the 'a' element has the correct href attribute
  await page.goto('/links');
  await expect(page.locator(LinkSelectors.LINKS).first()).toHaveAttribute('href', 'https://demoqa.com');
});

test('example 2', async ({ context }) => {
  // checking if the new opened page has the correct url
  const page = await context.newPage();
  await page.goto('/links');
  // start waiting for a new page
  const pagePromise = context.waitForEvent('page');
  await page.locator(LinkSelectors.LINKS).first().click();
  const newPage = await pagePromise;
  await newPage.waitForLoadState('networkidle');
  expect(newPage.url()).toEqual('https://demoqa.com/');
});

test('example 3', async ({ page }) => {
  await page.goto('/links');

  // remove the "target='_blank'" element to open the link in the same page
  const firstLink = page.locator(LinkSelectors.LINKS).first();
  await expect(firstLink).toBeVisible();
  await page.evaluate(() => {
    const link = document.querySelector('a#simpleLink');
    link.removeAttribute('target');
  });
  await firstLink.click();
  await page.waitForLoadState('networkidle');
  expect(page.url()).toEqual('https://demoqa.com/');
});