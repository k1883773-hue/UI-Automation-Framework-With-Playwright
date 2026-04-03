import { test, expect } from '@playwright/test';
import { ProductPO } from '../../pageObject/ProductPO.js';
import { config } from '../../utilities/config.js';
import Logger from '../../utilities/logs.js';

test.describe('Product Selection Tests', () => {

  let productPage;

  test.beforeEach(async ({ page }) => {

    productPage = new ProductPO(page);

    Logger.step('Navigating to application');
    await page.goto(config.url.local);

    Logger.step('Navigating to Products page');
    await productPage.navigateToProducts();
  });

  test('Verify random product selection opens correct product detail page', async () => {

    Logger.step('Selecting random product');

    const randomIndex = await productPage.getRandomProductIndex();
    const expectedProductName = await productPage.getProductNameByIndex(randomIndex);
    Logger.step(`Selected Product: ${expectedProductName}`);
    await productPage.clickProductByIndex(randomIndex);
    Logger.step('Verifying product detail page');
    const actualProductName = await productPage.getProductDetailName();
    expect(actualProductName.trim()).toContain(expectedProductName.trim());

  });

});