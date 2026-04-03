const addToCartButton = 'button[type="button"]';
const continueShoppingButton = 'button:has-text("Continue Shopping")';
const viewCartLink = 'text=View Cart';
const cartProductNames = '.cart_item .product-name';
const cartProductPrices = '.cart_item .product-price';

export class ProductPO {

  constructor(page) {
    this.page = page;
  }

  async navigateToProducts() {
    await this.page.locator('a[href="/products"]').click();
  }

  async getRandomProductIndex() {
    const count = await this.page.locator('.features_items .product-image-wrapper').count();
    return Math.floor(Math.random() * count);
  }

  async getProductNameByIndex(index) {
    return await this.page.locator('.features_items .productinfo p').nth(index).textContent();
  }

  async clickProductByIndex(index) {
    await this.page.locator('a[href*="/product_details/"]').nth(index).click();
  }

  async getProductDetailName() {
    return await this.page.locator('.product-information h2').textContent();
  }

  async clickAddToCart() {
    await this.page.locator(addToCartButton).click();
  }

  async clickContinueShopping() {
    await this.page.locator(continueShoppingButton).click();
  }

  async clickViewCart() {
    await this.page.locator(viewCartLink).click();
  }

  async getCartProducts() {
    const names = await this.page.locator(cartProductNames).allTextContents();
    const prices = await this.page.locator(cartProductPrices).allTextContents();

    const products = names.map((name, index) => ({
      name: name.trim(),
      price: prices[index].trim()
    }));

    return products;
  }

  async selectRandomProductAndOpen() {
    const index = await this.getRandomProductIndex();
    const name = await this.getProductNameByIndex(index);

    await this.clickProductByIndex(index);

    return name;
  }
}