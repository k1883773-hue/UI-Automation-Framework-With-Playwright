import { test, expect } from '@playwright/test';
import { LoginPO } from '../../pageObject/loginPO.js';
import { HomePO } from '../../pageObject/HomePO.js';
import { config } from '../../utilities/config.js';
import Logger from '../../utilities/logs.js';

test.describe('Logout Tests', () => {
  let loginPage;
  let homePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPO(page);
    homePage = new HomePO(page);

    Logger.step('Navigating to application');
    await page.goto(config.url.local);

    Logger.step('Navigating to login page');
    await homePage.navigateToLoginSignUp();
    await loginPage.loginToApplication('test0808@yopmail.com', 'Test@123'); 
  });

  test('Verify user can logout successfully', async () => {
    Logger.step('Verifying user is logged in');
    expect(await homePage.getLoggedInText()).toContain('Logged in as');

    Logger.step('Click on the Logout link');
    await homePage.clickOnLogout();

    Logger.step('Verify that the user is logged out successfully');
    expect(await homePage.isLoggedOut()).toBe(true);
  });
});