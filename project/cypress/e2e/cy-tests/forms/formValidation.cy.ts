import { Student } from '../../../../helpers/models/student';
import { FormHelpers } from '../../../../helpers/functions/formHelpers';
import { CyFormHelper } from '../../../../cy-helpers/cyFormHelper';
import { FormSelectors } from '../../../../helpers/selectors/forms';

describe('Form validation tests', () => {

  function validateWith(student: Student, requirements: string): void {
    cy.contains(FormSelectors.SUBMIT_BUTTON, 'Submit')
      .click();
    cy.get(FormSelectors.MODAL)
      .should('be.visible');
    CyFormHelper.validateForm(student, requirements);
  }

  beforeEach('Visit', () => {
    cy.visit('/automation-practice-form');
  });

  it('should successfully submit the form with min requirements', () => {
    const student: Student = FormHelpers.getRandomStudentMinRequirements();
    CyFormHelper.fillFormMinRequirements(student);
    validateWith(student, 'minReq');
  });

  it.only('should successfully submit the form with complete data', () => {
    const student: Student = FormHelpers.getRandomStudentFullData();
    CyFormHelper.fillFormAllFields(student);
    validateWith(student, 'fullReq');
  });

  it('should not be able to submit the form without required data', () => {
    const student: Student = FormHelpers.getRandomStudentMinRequirements();
    CyFormHelper.fillFormMinRequirements(student);
    // clear the phone input which is a required field
    cy.get(FormSelectors.PHONE_NUMBER_INPUT)
      .clear();
    cy.contains(FormSelectors.SUBMIT_BUTTON, 'Submit')
      .click();
    cy.get(FormSelectors.MODAL)
      .should('not.exist');
    cy.get(FormSelectors.PHONE_NUMBER_INPUT)
      .should('have.css', 'border-color', 'rgb(220, 53, 69)');
  });
});