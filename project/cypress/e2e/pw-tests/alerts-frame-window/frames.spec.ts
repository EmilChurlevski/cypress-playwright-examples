import { test, expect } from '@playwright/test';
import { FrameSelectors } from '../../../../helpers/selectors/alertsFrameWindow';

test('checks the header of frame 1 and 2', async ({ page }) => {
  await page.goto('/frames');
  // playwright is more flexible when it comes to iframes
  // we specify the iframe selector and use it as a variable to find selectors within the iframe
  const iframe1 = page.frameLocator(FrameSelectors.FRAME_1);
  const iframe2 = page.frameLocator(FrameSelectors.FRAME_2);
  await expect(iframe1.locator(FrameSelectors.FRAME_HEADING)).toContainText('This is a sample page');
  await expect(iframe2.locator(FrameSelectors.FRAME_HEADING)).toContainText('This is a sample page');
});

test('checks the content of nested frames', async ({ page }) => {
  await page.goto('/nestedframes');
  const parentIframe = page.frameLocator(FrameSelectors.FRAME_1);
  const childFrame = parentIframe.frameLocator('iframe');
  await expect(parentIframe.locator('body')).toContainText('Parent frame');
  await expect(childFrame.locator('p')).toContainText('Child Iframe');
});