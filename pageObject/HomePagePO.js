const productsMenu = 'a[href="/products"]';
const searchInput = '#search_product';
const searchButton = '#submit_search';
const searchedProductsTitle = '.title.text-center';
const productList = '.features_items .product-image-wrapper';
const noResultsMessage = 'text=No products found';
const logoutLink = 'text= Logout';
const loggedInText = 'text=Logged in as';
const loginLink = 'text= Signup / Login';

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
}
