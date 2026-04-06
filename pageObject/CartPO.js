const cartItems = '.cart_item';
const productNames = '.cart_description h4 a';
const productPrices = '.cart_price p';
const productQuantity = '.cart_quantity button';
const productTotalPrice = '.cart_total p';
const removeButtons = '.cart_quantity_delete';
const proceedToCheckoutBtn = 'text=Proceed To Checkout';

export class CartPO {
  constructor(page) {
    this.page = page;
  }

  async isCartEmpty() {
    const count = await this.page.locator(cartItems).count();
    Logger.step(`Cart items count: ${count}`);
    return count === 0;
  }

  async getCartProductNames() {
    return await this.page.locator(productNames).allTextContents();
  }

  async removeProductByIndex(index) {
    await this.page.locator(removeButtons).nth(index).click();
  }

  async clearCart() {
    const count = await this.page.locator(removeButtons).count();

    Logger.step(`Removing ${count} products from cart`);

    for (let i = 0; i < count; i++) {
      await this.page.locator(removeButtons).first().click();
      await this.page.waitForTimeout(500); // can replace with better wait later
    }
  }

  async isProductInCart(expectedProduct) {
    const products = await this.getCartProductNames();
    return products.some(p => p.trim() === expectedProduct);
  }

  async clickProceedToCheckout() {
    Logger.step('Clicking Proceed To Checkout');
    await this.page.locator(proceedToCheckoutBtn).click();
  }

  async getCartDetails() {
    const names = await this.getCartProductNames();
    const prices = await this.page.locator(productPrices).allTextContents();
    const quantities =  await this.page.locator(productQuantity).allTextContents();
    const totals = await this.page.locator(productTotalPrice).allTextContents();

    const cartData = names.map((name, index) => ({
      name: name.trim(),
      price: prices[index]?.trim(),
      quantity: quantities[index]?.trim(),
      total: totals[index]?.trim()
    }));

    Logger.step(`Cart Details: ${JSON.stringify(cartData)}`);

    return cartData;
  }
}