const signupLink = 'text= Signup / Login';
const signupNameInput = 'input[data-qa="signup-name"]';
const signupEmailInput = 'input[data-qa="signup-email"]';
const signupButton = 'button[data-qa="signup-button"]';

// account details
const titleMrRadio = '#id_gender1';
const passwordInput = '#password';
const dayDropdown = '#days';
const monthDropdown = '#months';
const yearDropdown = '#years';

// address details
const firstNameInput = '#first_name';
const lastNameInput = '#last_name';
const addressInput = '#address1';
const countryDropdown = '#country';
const stateInput = '#state';
const cityInput = '#city';
const zipcodeInput = '#zipcode';
const mobileNumberInput = '#mobile_number';

const createAccountButton = 'button[data-qa="create-account"]';
const successMessage = 'text=Account Created!';
const errorMessageLabel = 'text=Email Address already exist!';

export class SignupPO {

  constructor(page) {
    this.page = page;
  }

 

  async enterSignupName(name) {
    await this.page.locator(signupNameInput).fill(name);
  }

  async enterSignupEmail(email) {
    await this.page.locator(signupEmailInput).fill(email);
  }

  async clickOnSignupButton() {
    await this.page.locator(signupButton).click();
  }

  async signupWithNameAndEmail(name, email) {
    await this.enterSignupName(name);
    await this.enterSignupEmail(email);
    await this.clickOnSignupButton();
  }

  //fill account information form
  async selectTitle() {
    await this.page.locator(titleMrRadio).check();
  }

  async enterPassword(password) {
    await this.page.locator(passwordInput).fill(password);
  }

  async selectDOB(day, month, year) {
    await this.page.locator(dayDropdown).selectOption(day);
    await this.page.locator(monthDropdown).selectOption({ label: month });
    await this.page.locator(yearDropdown).selectOption(year);
  }

  // fill address details form
  async enterFirstName(firstName) {
    await this.page.locator(firstNameInput).fill(firstName);
  }

  async enterLastName(lastName) {
    await this.page.locator(lastNameInput).fill(lastName);
  }

  async enterAddress(address) {
    await this.page.locator(addressInput).fill(address);
  }

  async selectCountry(country) {
    await this.page.locator(countryDropdown).selectOption({ label: country });
  }

  async enterState(state) {
    await this.page.locator(stateInput).fill(state);
  }

  async enterCity(city) {
    await this.page.locator(cityInput).fill(city);
  }

  async enterZipcode(zipcode) {
    await this.page.locator(zipcodeInput).fill(zipcode);
  }

  async enterMobileNumber(mobile) {
    await this.page.locator(mobileNumberInput).fill(mobile);
  }

  async clickOnCreateAccount() {
    await this.page.locator(createAccountButton).click();
  }

  //fill signup details form
  async completeSignup(signupData) {
    await this.selectTitle();
    await this.enterPassword(signupData.getPassword());
    await this.selectDOB(
      signupData.getDay(),
      signupData.getMonth(),
      signupData.getYear()
    );

    await this.enterFirstName(signupData.getFirstName());
    await this.enterLastName(signupData.getLastName());
    await this.enterAddress(signupData.getAddress());
    await this.selectCountry(signupData.getCountry());
    await this.enterState(signupData.getState());
    await this.enterCity(signupData.getCity());
    await this.enterZipcode(signupData.getZipcode());
    await this.enterMobileNumber(signupData.getMobileNumber());

    await this.clickOnCreateAccount();
  }

  async getSuccessMessage() {
    return await this.page.locator(successMessage).textContent();
  }

  async getErrorMessage() {
    return await this.page.locator(errorMessageLabel).textContent();
  }
  async getEmailValidationMessage() {
    return await this.page.locator(signupEmailInput).evaluate(el => el.validationMessage);
  }

}