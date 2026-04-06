import { faker } from '@faker-js/faker';
import { Signup } from "../../dataObject/SignUp.js";

export class SignupData {

  static createValidSignupData() {
    const signup = new Signup();

    signup.setName(faker.person.firstName());
    signup.setEmail(faker.internet.email());
    signup.setPassword(faker.internet.password({ length: 10 }));
    signup.setDay(faker.number.int({ min: 1, max: 28 }).toString());
    signup.setMonth(faker.date.month());
    signup.setYear(faker.number.int({ min: 1980, max: 2005 }).toString());
    signup.setFirstName(faker.person.firstName());
    signup.setLastName(faker.person.lastName());
    signup.setAddress(faker.location.streetAddress());
    signup.setCountry('India'); // static 
    signup.setState(faker.location.state());
    signup.setCity(faker.location.city());
    signup.setZipcode(faker.location.zipCode());
    signup.setMobileNumber(faker.phone.number('9#########'));

    return signup;
  }

  static createSignupWithExistingEmail() {

    const signup = this.createValidSignupData();
    signup.setEmail('test0808@yopmail.com'); // override email with an existing email

    return signup;
}
}