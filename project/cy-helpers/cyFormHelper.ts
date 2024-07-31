/// <reference types="cypress" />
import { Student } from '../helpers/models/student';
import { FormSelectors } from '../helpers/selectors/forms';
import { FormHelpers } from '../helpers/functions/formHelpers';

export class CyFormHelper {

  /**
   * It adds subjects in the subjects input
   * @param student a student of type Student with hobbies data
   */
  public static addSubjects(student: Student): void {
    student.subjects.forEach(subject => {
      cy.get(FormSelectors.SUBJECTS_INPUT)
        .type(subject, { delay: 0 })
        .type('{enter}');
    });
  }

  /**
   * It selects the correct birthday
   * @param student the student used in the test of type Student
   */
  public static addBirthday(student: Student): void {
    const dayNumber: string = student.birthday.split(' ')[1].replace(',', '');
    cy.get(FormSelectors.BIRTHDAY_INPUT)
      .click();
    cy.log(student.birthday);
    cy.get(FormSelectors.DATEPICKER_MONTH_SELECT)
      .select(student.birthday.split(' ')[0]);
    cy.get(FormSelectors.DATEPICKER_YEAR_SELECT)
      .select(student.birthday.split(' ')[2]);
    cy.wait(10);
    cy.get(FormSelectors.DATEPICKER_DAY_CELL)
      .contains(new RegExp('^' + Number(dayNumber) + '$'))
      .click();
  }

  /**
   * It fills the required fields of the student form
   * @param student the student to use of type Student with min required data
   */
  public static fillFormMinRequirements(student: Student): void {
    cy.get(FormSelectors.FIRST_NAME_INPUT)
      .type(student.firstname, { delay: 0 });
    cy.get(FormSelectors.LAST_NAME_INPUT)
      .type(student.lastname, { delay: 0 });
    cy.contains(FormSelectors.GENDER_RADIO_BUTTONS, student.salutation)
      .click();
    cy.get(FormSelectors.PHONE_NUMBER_INPUT)
      .type(String(student.phoneNumber), { delay: 0 });
    this.addBirthday(student);
  }

  /**
   * It fills all the input fields from the student form
   * @param student the student to use of type Student with complete data
   */
  public static fillFormAllFields(student: Student): void {
    this.fillFormMinRequirements(student);
    cy.get(FormSelectors.EMAIL_INPUT)
      .type(student.email, { delay: 0 });
    this.addSubjects(student);
    cy.contains(FormSelectors.HOBBY_CHECKBOXES, student.hobbies[0])
      .click();
    this.uploadPhoto();
    this.fillStateAndCity(student);
    cy.get(FormSelectors.ADDRESS_TEXTAREA)
      .type(student.address, { delay: 0 });
  }

  /**
   * It selects the state and city of the student
   * @param student a student of type Student with state and city data
   */
  public static fillStateAndCity(student: Student): void {
    cy.get(FormSelectors.STATE_INPUT)
      .type(student.state+'{downarrow}{enter}', { delay: 100 })
    cy.get(FormSelectors.CITY_INPUT)
      .should('not.be.disabled')
      .type(student.city+'{downarrow}{enter}', { delay: 100 })
  }

  /**
   * It uploads a photo
   */
  public static uploadPhoto(): void {
    cy.get(FormSelectors.FILE_UPLOAD)
      .selectFile('cypress/fixtures/test.jpg');
  }

  /**
   * It validates the form validation modal
   * @param student the student used to submit the form
   * @param requirements which field to check, minReq or fullReq
   */
  public static validateForm(student: Student, requirements: string): void {
    const fieldsToTest = FormHelpers.fieldsToValidate[requirements];
    const studentDataArray = FormHelpers.studentDataAsArray(student, requirements);
    fieldsToTest.forEach((field: string, index: number) => {
      cy.contains(FormSelectors.MODAL_TABLE_CELLS, field)
        .next()
        .should('contain', studentDataArray[index]);
    });
  }
}