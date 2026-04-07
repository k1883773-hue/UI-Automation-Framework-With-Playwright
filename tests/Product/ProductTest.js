import { test, expect } from '@playwright/test';
import { ProductPO } from '../../pageObject/ProductPO.js';
import { HomePO } from '../../pageObject/HomePO.js';
import { config } from '../../utilities/config.js';
import Logger from '../../utilities/logs.js';

test.describe('Product Selection Tests', () => {

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

  test('Verify random product selection shows correct product details', async () => {

    Logger.step('Selecting random product');

    const randomIndex = await homePage.getRandomProductIndex();

    const expectedProductName = await homePage.getProductNameByIndex(randomIndex);
    const expectedProductPrice = await homePage.getProductPriceByIndex(randomIndex);

    Logger.step(`Selected Product: ${expectedProductName} - ${expectedProductPrice}`);
    await homePage.clickOnProductByIndex(randomIndex);

    const actualProductName = await productPage.getProductDetailName();
    const actualProductPrice = await productPage.getProductDetailPrice();

    expect(actualProductName.trim()).toContain(expectedProductName.trim());
    expect(actualProductPrice.trim()).toContain(expectedProductPrice.trim());

  });
  
});