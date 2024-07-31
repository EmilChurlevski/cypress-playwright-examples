import { TextBoxSelectors } from '../../../../helpers/selectors/elements';

describe('Assertions', () => {
  it('makes assertions on elements', () => {
    cy.visit('/text-box');

    // text assertion
    // element should be visible assertion
    cy.get(TextBoxSelectors.H1_HEADER).should('contain', 'Text Box');
    cy.contains(TextBoxSelectors.H1_HEADER, 'Text Box').should('be.visible');

    // check length of elements
    cy.get(TextBoxSelectors.INPUT_FIELD).should('have.length', 2);

    // check attribute, property and class of element
    cy.get(TextBoxSelectors.INPUT_FIELD).first().should('have.prop', 'placeholder', 'Full Name');
    cy.get(TextBoxSelectors.FORM).should('have.attr', 'id', 'userForm');
    cy.get(TextBoxSelectors.INPUT_FIELD).first().should('have.class', 'form-control');

    // check css of element
    cy.get(TextBoxSelectors.SUBMIT_BTN)
      .should('have.css', 'color', 'rgb(255, 255, 255)')
      .and('have.css', 'background-color', 'rgb(0, 123, 255)');
  });
});