const addToCartButton = 'button[type="button"]';
const cartProductNames = '.cart_item .product-name';
const cartProductPrices = '.cart_item .product-price';
const productItems = '.features_items .product-image-wrapper';
const productDetailName = '.product-information h2';

export class ProductPO {

  constructor(page) {
    this.page = page;
  }

  async navigateToProducts() {
    await this.page.locator('a[href="/products"]').click();
  }

  async getProductDetailName() {
    return await this.page.locator(productDetailName).textContent();
  }

  async clickAddToCart() {
    await this.page.locator(addToCartButton).click();
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
}