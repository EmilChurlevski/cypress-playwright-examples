export interface Student {
  firstname: string,
  lastname: string,
  email?: string,
  salutation: string,
  phoneNumber: number,
  birthday: string,
  subjects?: string[],
  hobbies?: string[],
  address?: string,
  state?: string,
  city?: string,
}