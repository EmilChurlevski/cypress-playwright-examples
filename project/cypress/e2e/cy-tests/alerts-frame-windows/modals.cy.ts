import { ModalSelectors } from '../../../../helpers/selectors/alertsFrameWindow';

describe('Modal tests', () => {

  beforeEach('Visit', () => {
    cy.visit('/modal-dialogs');
  });

  // according to cypress documentation, conditional testing is not encouraged
  // we should always know what our app does and write our tests accordingly
  it('should open the modal after button click', () => {
    // initially the modal is not opened therefore it does not exist
    cy.get(ModalSelectors.MODAL_CONTENT)
      .should('not.exist');
    cy.get(ModalSelectors.SMALL_MODAL_BUTTON) // or LARGE_MODAL_BUTTON
      .click();
    // after a click the modal should exist
    cy.get(ModalSelectors.MODAL_CONTENT)
      .should('exist');
    // after clicking the close button or the x button the modal should no longer exist
    cy.get(ModalSelectors.MODAL_CLOSE_BUTTON) // or MODAL_X_BUTTON
      .click();
    cy.get(ModalSelectors.MODAL_CONTENT)
      .should('not.exist');
  });

  // however there is a way to check if the element initially exists dynamically
  // if we do not know if the element exists or not
  // important note why is this relevant - Cypress cannot query an element that does not exist
  // so trying this:
  /**
   * cy.get(dynamicEl)
   *  .then(el => ... if(el)...
   */
  // will not work because the element does not exist
  it('should check if the modal exists/does not exist', () => {
    // the test passes no matter if the line under is commented out or not
    // cy.get(ModalSelectors.LARGE_MODAL_BUTTON).click();
    // we get the body of the html
    cy.get('body')
      .then(body => {
        // we create a new variable and check if the body contains the desired element
        const modal = body.find(ModalSelectors.MODAL_CONTENT);
        if ( modal.length > 0 ) {
          // write code if the desired element exists
          cy.get(ModalSelectors.MODAL_CONTENT)
            .should('be.visible');
        } else {
          // write code to trigger the element to appear
          cy.get(ModalSelectors.LARGE_MODAL_BUTTON)
            .click();
          cy.get(ModalSelectors.MODAL_CONTENT)
            .should('be.visible');
        }
      });
  });

  // using within()
  it('checks the contents of the modal', () => {
    const textInModal: string = 'This is a small modal. It has very less content';
    cy.get(ModalSelectors.SMALL_MODAL_BUTTON) // or LARGE_MODAL_BUTTON
      .click();
    cy.get(ModalSelectors.MODAL_CONTENT)
      .should('be.visible')
      .within(() => {
        // now  we can only use the elements inside MODAL_CONTENT
        cy.contains(ModalSelectors.MODAL_HEADER, 'Small Modal')
          .should('be.visible');
        cy.contains(ModalSelectors.MODAL_BODY, textInModal)
          .should('be.visible');
        cy.get(ModalSelectors.MODAL_CLOSE_BUTTON)
          .click();
      });
    cy.get(ModalSelectors.MODAL_CONTENT)
      .should('not.exist');
  });
});