import { test, expect } from '@playwright/test';
import { ModalSelectors } from '../../../../helpers/selectors/alertsFrameWindow';

test.describe('Modal tests', () => {

  test('should open the modal after a button click', async ({ page }) => {
    await page.goto('/modal-dialogs');
    // in playwright checking if an element does not exist is done by checking its count
    await expect(page.locator(ModalSelectors.MODAL_CONTENT)).toHaveCount(0);
    await page.locator(ModalSelectors.SMALL_MODAL_BUTTON).click();
    await expect(page.locator(ModalSelectors.MODAL_CONTENT)).toBeVisible();
    await page.locator(ModalSelectors.MODAL_CLOSE_BUTTON).click();
    await expect(page.locator(ModalSelectors.MODAL_CONTENT)).toHaveCount(0);
  });

  test('should check if the modal exists/does not exist', async ({ page }) => {
    await page.goto('/modal-dialogs');
    // the test passes no matter if the next line is commented out or not
    await page.locator(ModalSelectors.LARGE_MODAL_BUTTON).click();
    // since we are able to check if the element has count or not, working with dynamic elements is easier in PW
    const count = await page.locator(ModalSelectors.MODAL_CONTENT).count();
    if ( count > 0 ) {
      await expect(page.locator(ModalSelectors.MODAL_CONTENT)).toBeVisible();
    } else {
      await page.locator(ModalSelectors.LARGE_MODAL_BUTTON).click();
      await expect(page.locator(ModalSelectors.MODAL_CONTENT)).toBeVisible();
    }
  });

  // equivalent to cypress within()
  test('checks the contents of the modal', async ({ page }) => {
    const textInModal: string = 'This is a small modal. It has very less content';
    await page.goto('/modal-dialogs');
    // we declare a variable that equals the parent selector
    const modalContents = page.locator(ModalSelectors.MODAL_CONTENT);
    await page.locator(ModalSelectors.SMALL_MODAL_BUTTON).click();
    // after the modal (parent) is opened we can use the variable to query elements inside it
    await expect(modalContents).toBeVisible();
    await expect(modalContents.locator(ModalSelectors.MODAL_HEADER, { hasText: 'Small Modal' })).toBeVisible();
    await expect(modalContents.locator(ModalSelectors.MODAL_BODY, { hasText: textInModal })).toBeVisible();
    await modalContents.locator(ModalSelectors.MODAL_CLOSE_BUTTON).click();
    await expect(modalContents).toHaveCount(0);
  });
});