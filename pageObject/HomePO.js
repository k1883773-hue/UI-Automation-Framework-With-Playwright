const loginLink = 'text= Signup / Login';
const loggedInText = 'text=Logged in as';
const logoutLink = 'text= Logout';
const productsMenu = 'a[href="/products"]';
const searchInput = '#search_product';
const searchButton = '#submit_search';
const productList = '.features_items .product-image-wrapper';
const productDetailLinks = 'a[href*="/product_details/"]';
const productNames = '.features_items .productinfo p';
const productPrice = '.features_items .productinfo h2';
const deleteAccountLink = 'a[href="/delete_account"]';

export class HomePO {

  constructor(page) {
    this.page = page;
  }

  async navigateToLoginSignUp() {
    await this.page.locator(loginLink).click();
  }

  async navigateToProducts() {
    await this.page.locator(productsMenu).click();
  }

  async searchProduct(productName) {
    await this.page.locator(searchInput).fill(productName);
    await this.page.locator(searchButton).click();
  }

  async getProductCount() {
    return await this.page.locator(productList).count();
  }

  async getLoggedInText() {
    return await this.page.locator(loggedInText).textContent();
  }

  async clickOnLogout() {
    await this.page.locator(logoutLink).click();
  }

  async isLoggedOut() {
    return await this.page.locator(loginLink).isVisible();
  }

  async clickOnProductByIndex(index) {
    await this.page.locator(productDetailLinks).nth(index).click();
  }

  async getProductNameByIndex(index) {
    return await this.page.locator(productNames).nth(index).textContent();
  }

  async getProductPriceByIndex(index) {
    return await this.page.locator(productPrice).nth(index).textContent();
  }

  async getRandomProductIndex() {
    const count = await this.page.locator(productList).count();
    return Math.floor(Math.random() * count);
  }

  async selectRandomProductAndOpen() {
    const index = await this.getRandomProductIndex();
    const name = await this.getProductNameByIndex(index);

    await this.clickOnProductByIndex(index);

    return name;
  }

  async navigateToCartPage() {
    await this.page.locator('header a[href="/view_cart"]').click();
  }

  async clickOnDeleteAccount() {
    await this.page.locator(deleteAccountLink).click();
  }

}
