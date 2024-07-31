import { DynamicSelectors } from '../../../../helpers/selectors/elements';

describe('Dynamic buttons tests', () => {

  beforeEach('Visit', () => {
    cy.visit('/dynamic-properties');
  });

  it('waits for the button to be enabled', () => {
    // cy.wait() should be used if no other method works
    // in this case we know the button will be enabled in 5 seconds
    // the button is disabled initially
    cy.get(DynamicSelectors.DYNAMIC_BTN)
      .should('be.disabled');

    // added a timeout for 5500 milliseconds just to be safe
    cy.get(DynamicSelectors.DYNAMIC_BTN, { timeout: 5500 })
      .should('be.enabled')
      .click();
  });

  it('checks the css of a dynamic button', () => {
    //initial
    cy.get(DynamicSelectors.COLOR_CHANGE_BTN)
      .should('have.css', 'background-color', 'rgb(0, 123, 255)')
      .and('have.css', 'color', 'rgb(255, 255, 255)');

    // after 5 seconds
    cy.get(DynamicSelectors.COLOR_CHANGE_BTN, { timeout: 5500 })
      .should('have.css', 'color', 'rgb(220, 53, 69)')
      .and('have.css', 'background-color', 'rgb(0, 123, 255)');
  });

  it('clicks on a button that appears after 5 seconds', () => {
    cy.get(DynamicSelectors.VISIBLE_AFTER_BTN, { timeout: 5500 })
      .should('be.visible')
      .click();
  });
});