const signupNameInput = 'input[data-qa="signup-name"]';
const signupEmailInput = 'input[data-qa="signup-email"]';
const signupButton = 'button[data-qa="signup-button"]';

// account details
const titleMrRadioButton = '#id_gender1';
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
  
  async signupWithNameAndEmail(name, email) {
    await this.page.locator(signupNameInput).fill(name);
    await this.page.locator(signupEmailInput).fill(email);
    await this.clickOnSignupButton();
  }
  
  async clickOnSignupButton() {
    await this.page.locator(signupButton).click();
  }

  //fill signup details form
  async fillSignupDetails(signupData) {
  
    await this.page.locator(signupNameInput).fill(signupData.getName());
  await this.page.locator(signupEmailInput).fill(signupData.getEmail());
  await this.page.locator(signupButton).click();
  await this.page.locator(titleMrRadioButton).check();

  await this.page.locator(passwordInput).fill(signupData.getPassword());

  await this.page.locator(dayDropdown).selectOption(signupData.getDay());
  await this.page.locator(monthDropdown).selectOption({ label: signupData.getMonth() });
  await this.page.locator(yearDropdown).selectOption(signupData.getYear());

  await this.page.locator(firstNameInput).fill(signupData.getFirstName());
  await this.page.locator(lastNameInput).fill(signupData.getLastName());
  await this.page.locator(addressInput).fill(signupData.getAddress());

  await this.page.locator(countryDropdown).selectOption({ label: signupData.getCountry() });

  await this.page.locator(stateInput).fill(signupData.getState());
  await this.page.locator(cityInput).fill(signupData.getCity());
  await this.page.locator(zipcodeInput).fill(signupData.getZipcode());
  await this.page.locator(mobileNumberInput).fill(signupData.getMobileNumber());

  await this.page.locator(createAccountButton).click();
}

  async getSuccessMessage() {
    return await this.page.locator(successMessage).textContent();
  }

  async getErrorMessage() {
    return await this.page.locator(errorMessageLabel).textContent();
  }

}