import { test, expect } from '@playwright/test';
import { HomePagePO } from '../../pageObject/HomePagePO.js';
import { SearchProductData } from '../../dataFactory/ProductData/ProductData.js';
import { config } from '../../utilities/config.js';
import Logger from '../../utilities/logs.js';

test.describe('Search Product Tests', () => {

    let productPage;

    test.beforeEach(async ({ page }) => {

        productPage = new HomePagePO(page);

        Logger.step('Navigating to application');
        await page.goto(config.url.local);

        Logger.step('Navigating to Products page');
        await productPage.navigateToProducts();
    });

    test('Verify search with valid product', async () => {

        const searchData = SearchProductData.createValidSearchData();

        Logger.step('Searching valid product');
        await productPage.searchProduct(searchData.getProductName());
        Logger.step('Verifying search results are displayed');
        await expect(productPage.page.locator('.title.text-center')).toContainText('Searched Products');
        expect(await productPage.getProductCount()).toBeGreaterThan(0);

    });

    test('Verify search with invalid product', async () => {

        const searchData = SearchProductData.createInvalidSearchData();

        Logger.step('Searching invalid product');
        await productPage.searchProduct(searchData.getProductName());
        Logger.step('Verifying no results or empty list');
        expect(await productPage.getProductCount()).toBe(0);

    });

});