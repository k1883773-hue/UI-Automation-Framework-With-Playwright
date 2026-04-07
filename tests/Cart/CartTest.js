import { test, expect } from '@playwright/test';
import { ProductPO } from '../../pageObject/ProductPO.js';
import { HomePO } from '../../pageObject/HomePO.js';
import { config } from '../../utilities/config.js';
import Logger from '../../utilities/logs.js';

test.describe('Add To Cart Tests', () => {

  let productPage;
  let homePage;

  test.beforeEach(async ({ page }) => {

    productPage = new ProductPO(page);
    homePage = new HomePO(page);

    Logger.step('Navigating to application');
    await page.goto(config.url.local);
    Logger.step('Navigating to Products page');
    await homePage.navigateToProducts();
  });

  test('Verify product can be added to cart successfully', async () => {

    Logger.step('Selecting product and opening details page');
    await homePage.selectRandomProductAndOpen();

    Logger.step('Adding product to cart');
    await productPage.clickAddToCart();

    Logger.step('Navigating to cart');
    await homePage.navigateToCartPage();

    Logger.step('Verifying product in cart');
    const cartProducts = await productPage.getCartProducts();
    cartProducts.forEach(product => {
      Logger.step(`Verifying product: ${product.name} with price: ${product.price}`);
      expect(product.price).toMatch(/\$/);
    });

  });

});