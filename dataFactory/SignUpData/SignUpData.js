import { faker } from '@faker-js/faker';
import { Signup } from "../../dataObject/SignUp.js";

export class SignupData {

  static createValidSignupData() {
    const signup = new Signup();

    signup.name = faker.person.firstName();
    signup.email = faker.internet.email();
    signup.password = faker.internet.password({ length: 10 });
    signup.day = this.generateRandomDay();
    signup.month = this.generateRandomMonth();
    signup.year = this.generateRandomYear();
    signup.firstName = faker.person.firstName();
    signup.lastName = faker.person.lastName();
    signup.address = faker.location.streetAddress();
    signup.country = 'India';
    signup.state = faker.location.state();
    signup.city = faker.location.city();
    signup.zipcode = faker.location.zipCode();
    signup.mobileNumber = faker.phone.number('9#########');

    return signup;
  }

  static createSignupWithExistingEmail() {
    const signup = this.createValidSignupData();
    signup.email = 'test0808@yopmail.com'; // override
    return signup;
  }

  static createInvalidSignupData() {
    const signup = this.createValidSignupData();
    signup.password = ''; 
    return signup;
  }

  static generateRandomDay() {
    return faker.number.int({ min: 1, max: 28 }).toString();
  }

  static generateRandomMonth() {
    return faker.date.month();
  }

  static generateRandomYear() {
    return faker.number.int({ min: 1980, max: 2005 }).toString();
  }
}
