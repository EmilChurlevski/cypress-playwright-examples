import { ImageSelectors } from '../../../../helpers/selectors/elements';

it('checks if an image is correctly loaded', () => {
  cy.visit('/broken');
  // the test fails because the image is broken
  cy.get(ImageSelectors.BROKEN_IMG)
    .should('have.prop', 'naturalWidth') // naturalHeight can also be used
    .and('be.greaterThan', 0);
});