const emailTextBox = 'input[data-qa="login-email"]';
const passwordTextBox = 'input[data-qa="login-password"]';
const loginButton = 'button[data-qa="login-button"]';
const errorMessageLabel = '.login-form p';

export class LoginPO {

  constructor(page) {
    this.page = page;
  }

  async enterEmail(email) {
    await this.page.locator(emailTextBox).fill(email);
  }

  async clickOnLoginButton() {
    await this.page.locator(loginButton).click();
  }

  async loginToApplication(email, password) {
    await this.enterEmail(email);
    await this.page.locator(passwordTextBox).fill(password);
    await this.clickOnLoginButton();
  }

  async getErrorMessage() {
    return await this.page.locator(errorMessageLabel).textContent();
  }

  async getEmailRequiredMessage() {
    return await this.page.locator(emailTextBox).evaluate(el => el.validationMessage);
  }

}
