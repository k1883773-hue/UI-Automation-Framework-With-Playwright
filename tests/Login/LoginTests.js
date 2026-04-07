import { test, expect } from '@playwright/test';
import { LoginData } from '../../dataFactory/LoginData/LoginData.js';
import { LoginPO } from '../../pageObject/loginPO.js';
import { HomePO } from '../../pageObject/HomePO.js';
import { config } from '../../utilities/config.js';
import Logger from '../../utilities/logs.js';

test.describe('Login Tests', () => {

  let loginPage;
  let homePage;

  test.beforeEach(async ({ page }) => {

    loginPage = new LoginPO(page);
    homePage = new HomePO(page);

    Logger.step('Navigating to application');
    await page.goto(config.url.local);

    Logger.step('Clicking on Login Link');
    await homePage.navigateToLoginSignUp();

  });

  test('Verify user login with valid credentials', async () => {

    const loginData = new LoginData().getValidData();

    Logger.step('Enter valid credentials and submit');
    await loginPage.loginToApplication(loginData.email, loginData.password);
    
    Logger.step('Verifying successful login');
    expect(await homePage.getLoggedInText()).toContain('Logged in as');
  });

  test('Verify error message for invalid login', async () => {

    const loginData = new LoginData().getInvalidData();

    Logger.step('Entering invalid credentials');
    await loginPage.loginToApplication(loginData.email, loginData.password);

    Logger.step('verifying error message');
    expect(await loginPage.getErrorMessage()).toContain('Your email or password is incorrect!');
  });

  test('Verify error message for invalid email format', async () => {

    const loginData = new LoginData().getInvalidEmailFormatData();

    Logger.step('Entering invalid email format');
    await loginPage.loginToApplication(loginData.email, loginData.password);

    Logger.step('Verifying error message for invalid email format');
    expect(await loginPage.getEmailRequiredMessage()).toMatch(/email/i);
  });

  test('Verify error message for empty fields', async () => {

    Logger.step('Click login without entering credentials');
    await loginPage.clickOnLoginButton();

    Logger.step('Verifying validation message');
    const emailValidation = await loginPage.getEmailRequiredMessage();
    expect(emailValidation).toMatch(/fill/i);
  });

});