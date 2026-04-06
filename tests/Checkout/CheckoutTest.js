import { test, expect } from '@playwright/test';
import { LoginPO } from '../../pageObject/loginPO.js';
import { HomePagePO } from '../../pageObject/HomePagePO.js';
import { ProductPO } from '../../pageObject/ProductPO.js';
import { CartPO } from '../../pageObject/CartPO.js';
import { CheckoutPO } from '../../pageObject/CheckoutPO.js';
import { LoginData } from '../../dataFactory/LoginData/LoginData.js';
import { config } from '../../utilities/config.js';
import Logger from '../../utilities/logs.js';

test.describe('Add To Cart Tests', () => {

    let loginPage;
    let homePage;
    let cartPage;
    let checkoutPage;
    let productPage;

    test.beforeEach(async ({ page }) => {

        loginPage = new LoginPO(page);
        productPage = new ProductPO(page);
        homePage = new HomePagePO(page);
        cartPage = new CartPO(page);
        checkoutPage = new CheckoutPO(page);

        Logger.step('Navigating to application');
        await page.goto(config.url.local);

        Logger.step('Clicking on Login Link');
        await homePage.navigateToLoginSignUp();

    });

    test('Verify complete checkout flow', async () => {

        const loginData = new LoginData().getValidData();

        Logger.step('Enter valid credentials and submit');
        await loginPage.loginToApplication(loginData.email, loginData.password);
        Logger.step('Verifying successful login');
        expect(await homePage.getLoggedInText()).toContain('Logged in as');

        Logger.step('Navigating to cart');
        await homePage.navigateToCartPage();

        Logger.step('Checking if cart is empty');
        const isEmpty = await cartPage.isCartEmpty();

        if (!isEmpty) {
            Logger.step('Cart is not empty, clearing cart');
            await cartPage.clearCart();
        }

        Logger.step('Adding random product to cart');
        const selectedProduct = await homePage.selectRandomProductAndOpen();

        Logger.step('Verifying product in cart');
        const isProductPresent = await cartPage.isProductInCart(selectedProduct);
        expect(isProductPresent).toBe(true);

        Logger.step('Proceeding to checkout');
        await checkoutPage.proceedToCheckout();

        Logger.step('Placing order');
        await checkoutPage.placeOrder();
    });

});
