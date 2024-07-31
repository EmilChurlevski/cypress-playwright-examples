import { Student } from '../models/student';
import { DataGenerator } from './dataGenerator';

export class FormHelpers {

  /**
   * It returns a student that has minimal required data
   * to successfully fulfill the form
   */
  public static getRandomStudentMinRequirements(): Student {
    const firstname: string = DataGenerator.getRandomName();
    const lastname: string = DataGenerator.getRandomName();
    const birthday: string = DataGenerator.getRandomBirthday();
    const salutation: string = DataGenerator.getRandomSalutation();
    const phoneNumber: number = DataGenerator.getRandomTenDigits();
    return {
      firstname: firstname,
      lastname: lastname,
      birthday: birthday,
      salutation: salutation,
      phoneNumber: phoneNumber
    };
  }

  /**
   * Returns a student with complete data for all input fields
   * from the student form
   */
  public static getRandomStudentFullData(): Student {
    const student: Student = this.getRandomStudentMinRequirements();
    student.email = DataGenerator.getRandomEmail();
    student.subjects = ['Maths', 'English'];
    student.hobbies = [DataGenerator.getRandomHobby()];
    student.state = DataGenerator.getRandomState();
    student.city = DataGenerator.getRandomCity(student.state);
    student.address = 'Test Address 123';
    return student;
  }

  /**
   * Returns a date formatted for validation modal
   * @param studentBirthday the birthday of the student
   */
  public static parseDateForValidation(studentBirthday: string): string {
    const array = studentBirthday.split(' ');
    return array[1].replace(',', '') + ' ' + array[0] + ',' + array[2];
  }

  /**
   * It returns the fields to validate in the form validation modal
   */
  public static fieldsToValidate = {
    'minReq': ['Student Name', 'Gender', 'Mobile', 'Date of Birth'],
    'fullReq': [
      'Student Name',
      'Student Email',
      'Gender',
      'Mobile',
      'Date of Birth',
      'Subjects',
      'Hobbies',
      'Picture',
      'Address',
      'State and City'
    ]
  };

  /**
   * It returns the student data as array
   * @param student which student to use, min reqs or full data
   * @param requirements what type of student to return, minReq or fullReq
   */
  public static studentDataAsArray(student: Student, requirements: string): string[] {
    return requirements === 'minReq' ? [
        student.firstname + ' ' + student.lastname,
        student.salutation,
        String(student.phoneNumber),
        FormHelpers.parseDateForValidation(student.birthday)
      ] :
      [
        student.firstname + ' ' + student.lastname,
        student.email,
        student.salutation,
        String(student.phoneNumber),
        FormHelpers.parseDateForValidation(student.birthday),
        student.subjects.join(', '),
        student.hobbies.join(' '),
        'test.jpg',
        student.address,
        student.state + ' ' + student.city
      ];
  };
}