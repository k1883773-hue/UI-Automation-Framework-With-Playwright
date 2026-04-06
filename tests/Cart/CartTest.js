import { test, expect } from '@playwright/test';
import { ProductPO } from '../../pageObject/ProductPO.js';
import { HomePagePO } from '../../pageObject/HomePagePO.js';
import { config } from '../../utilities/config.js';
import Logger from '../../utilities/logs.js';

test.describe('Add To Cart Tests', () => {

  let productPage;
  let homePage;

  test.beforeEach(async ({ page }) => {

    productPage = new ProductPO(page);
    homePage = new HomePagePO(page);

    Logger.step('Navigating to application');
    await page.goto(config.url.local);
    Logger.step('Navigating to Products page');
    await productPage.navigateToProducts();
  });

  test('Verify random product can be added to cart successfully', async () => {

    Logger.step('Selecting random product and opening details page');
    const expectedProductName = await homePage.selectRandomProductAndOpen();
    Logger.step('Verifying correct product detail page is opened');
    const actualProductName = await productPage.getProductDetailName();
    expect(actualProductName.trim()).toContain(expectedProductName.trim());
    Logger.step('Adding product to cart');
    await productPage.clickAddToCart();
    Logger.step('Navigating to cart');
    await homePage.clickViewCart();
    Logger.step('Verifying product in cart');
    const cartProducts = await productPage.getCartProducts();
    cartProducts.forEach(product => {
      Logger.step(`Verifying product: ${product.name} with price: ${product.price}`);
      expect(product.price).toMatch(/\$/);
    });

  });

});