const loginLink = 'text= Signup / Login';
const loggedInText = 'text=Logged in as';
const logoutLink = 'text= Logout';
const productsMenu = 'a[href="/products"]';
const searchInput = '#search_product';
const searchButton = '#submit_search';
const searchedProductsTitle = '.title.text-center';
const productList = '.features_items .product-image-wrapper';
const noResultsMessage = 'text=No products found';
const continueShoppingButton = 'button:has-text("Continue Shopping")';
const productDetailLinks = 'a[href*="/product_details/"]';
const productNames = '.features_items .productinfo p';
const productPrice = '.features_items .productinfo h2';
const cartLink = 'a[href="/view_cart"]';

export class HomePagePO {

  constructor(page) {
    this.page = page;
  }

  async navigateToLogin() {
    await this.page.locator(loginLink).click();
  }

  async navigateToProducts() {
    await this.page.locator(productsMenu).click();
  }

  async enterSearchProduct(productName) {
    await this.page.locator(searchInput).fill(productName);
  }

  async clickSearch() {
    await this.page.locator(searchButton).click();
  }

  async searchProduct(productName) {
    await this.enterSearchProduct(productName);
    await this.clickSearch();
  }

  async getSearchedProductTitle() {
    return await this.page.locator(searchedProductsTitle).textContent();
  }

  async getProductCount() {
    return await this.page.locator(productList).count();
  }

  async isNoResultVisible() {
    return await this.page.locator(noResultsMessage).isVisible();
  }

  async getLoggedInText() {
    return await this.page.locator(loggedInText).textContent();
  }

  async clickLogout() {
    await this.page.locator(logoutLink).click();
  }

  async isLoggedOut() {
    const signupLoginVisible = await this.page.locator(loginLink).isVisible();
    return signupLoginVisible;
  }

  async getLoggedInText() {
    return await this.page.locator('text=Logged in as').textContent();
  }

  async clickContinueShopping() {
    await this.page.locator(continueShoppingButton).click();
  }

  async clickProductByIndex(index) {
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

    await this.clickProductByIndex(index);

    return name;
  }

 async navigateToCartPage() {
  await this.page.locator('header a[href="/view_cart"]').click();
}
}
