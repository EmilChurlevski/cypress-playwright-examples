import { test, expect } from '@playwright/test';
import { UploadDownloadSelectors } from '../../../../helpers/selectors/elements';

test('uploads a file', async ({ page }) => {
  await page.goto('/upload-download');
  await page.locator(UploadDownloadSelectors.UPLOAD).click();
  await page.locator(UploadDownloadSelectors.UPLOAD).setInputFiles('cypress/fixtures/test.jpg');
  await expect(page.locator(UploadDownloadSelectors.UPLOADED_PATH)).toContainText('test.jpg');
});

test('downloads a file', async ({ page }) => {
  await page.goto('/upload-download');
  const fileName: string = 'sampleFile.jpeg';
  const downloadPromise = page.waitForEvent('download');
  await page.locator(UploadDownloadSelectors.DOWNLOAD_BTN).click();
  const download = await downloadPromise;
  await download.saveAs('downloads/' + fileName);
});