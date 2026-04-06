const deleteSuccessMessage = 'text=Account Deleted!';
const continueButton = 'a[data-qa="continue-button"]';

export class DeleteAccountPO {

  constructor(page) {
    this.page = page;
  }

  async getDeleteConfirmationMessage() {
    return await this.page.locator(deleteSuccessMessage).textContent();
  }

  async clickContinue() {
    await this.page.locator(continueButton).click();
  }

  async verifyAccountDeleted() {
    await this.page.locator(deleteSuccessMessage).waitFor();
  }
}