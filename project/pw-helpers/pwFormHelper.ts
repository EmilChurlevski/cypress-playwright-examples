import { Student } from '../helpers/models/student';
import { Page, expect } from '@playwright/test';
import { FormSelectors } from '../helpers/selectors/forms';
import { FormHelpers } from '../helpers/functions/formHelpers';

export class PwFormHelper {

  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * It adds subjects in the subjects input
   * @param student a student of type Student with hobbies data
   */
  async addSubjects(student: Student): Promise<void> {
    for ( let i = 0; i < student.subjects.length; i++ ) {
      await this.page.locator(FormSelectors.SUBJECTS_INPUT).fill(student.subjects[i]);
      await this.page.waitForTimeout(1000);
      await this.page.keyboard.press('Enter');
    }
  }

  /**
   * It adds the birthday in the birthday input
   * @param student the student used in the test
   */
  async addBirthday(student: Student): Promise<void> {
    const dayNumber = student.birthday.split(' ')[1].replace(',', '');
    await this.page.locator(FormSelectors.BIRTHDAY_INPUT).click();
    await this.page.selectOption(FormSelectors.DATEPICKER_MONTH_SELECT, student.birthday.split(' ')[0]);
    await this.page.selectOption(FormSelectors.DATEPICKER_YEAR_SELECT, student.birthday.split(' ')[2]);
    await this.page.locator(FormSelectors.DATEPICKER_DAY_CELL, { hasText: new RegExp('^' + Number(dayNumber) + '$')}).click();
  }

  /**
   * It fills the required fields of the student form
   * @param student the student to use of type Student with min required data
   */
  async fillFormMinRequirements(student: Student): Promise<void> {
    await this.page.locator(FormSelectors.FIRST_NAME_INPUT).fill(student.firstname);
    await this.page.locator(FormSelectors.LAST_NAME_INPUT).fill(student.lastname);
    await this.addBirthday(student);
    await this.page.locator(FormSelectors.PHONE_NUMBER_INPUT).fill(String(student.phoneNumber));
    await this.page.getByText(student.salutation, { exact: true }).click();
  }

  /**
   * It fills all the input fields from the student form
   * @param student the student to use of type Student with complete data
   */
  async fillFormAllFields(student: Student): Promise<void> {
    await this.fillFormMinRequirements(student);
    await this.addSubjects(student);
    await this.page.locator(FormSelectors.EMAIL_INPUT).fill(student.email);
    await this.page.locator(FormSelectors.HOBBY_CHECKBOXES, { hasText: student.hobbies[0] }).click();
    await this.uploadPhoto();
    await this.page.locator(FormSelectors.ADDRESS_TEXTAREA).fill(student.address);
    await this.fillStateAndCity(student);
  }

  /**
   * It selects the state and city of the student
   * @param student a student of type Student with state and city data
   */
  async fillStateAndCity(student: Student): Promise<void> {
    await this.page.locator(FormSelectors.STATE_INPUT + ' input').fill(student.state);
    await this.page.keyboard.press('Tab');
    await this.page.locator(FormSelectors.CITY_INPUT + ' input').fill(student.city);
    await this.page.keyboard.press('Tab');
  }

  /**
   * It uploads a photo
   */
  async uploadPhoto(): Promise<void> {
    await this.page.locator(FormSelectors.FILE_UPLOAD).click();
    await this.page.locator(FormSelectors.FILE_UPLOAD).setInputFiles('cypress/fixtures/test.jpg');
  }

  /**
   * It validates the form by checking the modal
   * @param student the student used in the test
   * @param requirements which fields to check, 'minReq' or 'fullReq'
   */
  async validateForm(student: Student, requirements: string): Promise<void> {
    const fieldsToTest = FormHelpers.fieldsToValidate[requirements];
    const studentDataArray = FormHelpers.studentDataAsArray(student, requirements);
    for ( let i = 0; i < fieldsToTest.length; i++ ) {
      await expect(this.page.locator(FormSelectors.MODAL_TABLE_ROWS, { hasText: fieldsToTest[i] + studentDataArray[i]})).toBeVisible();
      const dataCell = this.page.locator(FormSelectors.MODAL_TABLE_CELLS + ' + td', { hasText: studentDataArray[i] });
      await expect(dataCell).toBeVisible();
    }
  }
}