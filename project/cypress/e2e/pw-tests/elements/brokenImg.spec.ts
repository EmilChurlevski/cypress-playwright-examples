import { test, expect } from '@playwright/test';
import { ImageSelectors } from '../../../../helpers/selectors/elements';

test('checks if an image is correctly loaded', async ({ page }) => {
  await page.goto('/broken');
  // the test fails because the image is broken
  await expect(page.locator(ImageSelectors.BROKEN_IMG)).not.toHaveJSProperty('naturalHeight', 0);
});