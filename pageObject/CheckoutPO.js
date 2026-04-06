const proceedToCheckoutBtn = 'text=Proceed To Checkout';
const placeOrderBtn = 'text=Place Order';

export class CheckoutPO {
    constructor(page) {
        this.page = page;
    }

    async proceedToCheckout() {
        await this.page.locator(proceedToCheckoutBtn).click();
    }

    async placeOrder() {
        await this.page.locator(placeOrderBtn).click();
    }


}