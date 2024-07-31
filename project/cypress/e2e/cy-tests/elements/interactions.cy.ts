import {
  ButtonSelectors,
  CheckboxSelectors,
  RadioButtonsSelectors,
  WebTableSelectors
} from '../../../../helpers/selectors/elements';

describe('Interactions', () => {

  it('checks a checkbox', () => {
    cy.visit('/checkbox');

    // checkbox is checked or unchecked
    cy.get(CheckboxSelectors.LABEL)
      .should('not.be.checked')
      .click();
    cy.get(CheckboxSelectors.INPUT_FIELD)
      .should('be.checked');

    // element exists or does not exist
    cy.get(CheckboxSelectors.RESULT)
      .should('exist');
    //.should('not.exist);
  });

  it('interacts with the radio buttons', () => {
    cy.visit('/radio-button');

    // checks the yes radio button
    cy.contains(RadioButtonsSelectors.LABEL, 'Yes')
      .click();
    cy.get(RadioButtonsSelectors.YES_RADIO_BTN)
      .should('be.checked');

    // the no radio button should be disabled
    cy.get(RadioButtonsSelectors.NO_RADIO_BTN)
      .should('be.disabled');
  });

  it('performs a search on the table', () => {
    cy.visit('/webtables');

    // searches for cierra
    cy.get(WebTableSelectors.SEARCH_BOX_INPUT)
      .type('cierra', { delay: 0 });
    cy.get(WebTableSelectors.TABLE_CELL)
      .first()
      .should('have.text', 'Cierra');
  });

  it('clicks test', () => {
    cy.visit('/buttons');

    // double click
    cy.get(ButtonSelectors.DB_CLICK_BTN)
      .dblclick();
    cy.contains(ButtonSelectors.DB_CLICK_MSG, 'You have done a double click')
      .should('be.visible');

    // right click
    cy.get(ButtonSelectors.RIGHT_CLICK_BTN)
      .rightclick();
    cy.contains(ButtonSelectors.RIGHT_CLICK_MSG, 'You have done a right click')
      .should('be.visible');

    // normal click
    cy.get(ButtonSelectors.NORMAL_CLICK_BTN)
      .last()
      .click();
    cy.contains(ButtonSelectors.NORMAL_CLICK_MSG, 'You have done a dynamic click')
      .should('be.visible');
  });
});

