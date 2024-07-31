import { test, expect } from '@playwright/test';
import { LinkSelectors } from '../../../../helpers/selectors/elements';

test.describe('API Tests', () => {
  const desiredStatusResponses: number[] = [
    201,
    204,
    301,
    400,
    401,
    403,
    404
  ];

  const endpoints: string[] = [
    '/created',
    '/no-content',
    '/moved',
    '/bad-request',
    '/unauthorized',
    '/forbidden',
    '/invalid-url'
  ];

  test('checks the status of each api call via backend', async ({ request }) => {
    for ( let i = 0; i < endpoints.length; i++ ) {
      const response = await request.get(endpoints[i]);
      expect(response.status()).toEqual(desiredStatusResponses[i]);
    }
  });

  test('checks the status code via frontend', async ({ page }) => {
    await page.goto('/links');
    for ( let i = 0; i < desiredStatusResponses.length; i++ ) {

      await page.locator(LinkSelectors.LINKS).nth(i + 2).click();

      // if we want to check each message then put every message in an array
      // and replace the "String(...) with the messagesArray[i]
      await page.waitForSelector(LinkSelectors.LINK_RESPONSE);
      await expect(page.locator(LinkSelectors.LINK_RESPONSE)).toContainText(String(desiredStatusResponses[i]));

      // check if each api call responded with the correct status
      await page.route(endpoints[i], async route => {
        const response = await route.fetch();
        expect(response.status()).toEqual(desiredStatusResponses[i]);
      });
    }
  });
});