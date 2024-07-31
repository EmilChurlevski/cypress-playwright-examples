import { LinkSelectors } from '../../../../helpers/selectors/elements';

describe('Links tests', () => {

  // cypress does not support a second tab
  // so in order to check if the correct page is opened after clicking on a link
  // we can do the following

  beforeEach('Visit', () => {
    cy.visit('/links');
  });

  it('example 1', () => {
    // check if the 'a' element has the correct href attribute
    cy.get(LinkSelectors.LINKS)
      .first()
      .should('have.attr', 'href', 'https://demoqa.com');
  });

  it('example 2', () => {
    // remove the "target='_blank'" element to open the link in the same page
    cy.get(LinkSelectors.LINKS)
      .first()
      .invoke('removeAttr', 'target')
      .click();
    cy.url().should('eq', 'https://demoqa.com/');
  });
});
