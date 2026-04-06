import { test, expect } from '@playwright/test';
import { LoginPO } from '../../pageObject/loginPO.js';
import { SignupPO } from '../../pageObject/SignUpPO.js';
import { HomePagePO } from '../../pageObject/HomePagePO.js';
import { DeleteAccountPO } from '../../pageObject/DeleteAccountPO.js';
import { SignupData } from '../../dataFactory/SignUpData/SignUpData.js';
import { LoginData } from '../../dataFactory/LoginData/LoginData.js';
import { config } from '../../utilities/config.js';
import Logger from '../../utilities/logs.js';

test.describe('Delete Account Tests', () => {

    let loginPage;
    let homePage;
    let deleteAccountPage;
    let signUpPage;

    test.beforeEach(async ({ page }) => {

        loginPage = new LoginPO(page);
        homePage = new HomePagePO(page);
        deleteAccountPage = new DeleteAccountPO(page);
        signUpPage = new SignupPO(page);

        Logger.step('Navigating to application');
        await page.goto(config.url.local);

        await homePage.navigateToLoginSignUp();
        const signUpData = SignupData.createValidSignupData();
        Logger.step('Enter valid signup details and submit');
      
        await signUpPage.signupWithNameAndEmail(signUpData.name, signUpData.email);
        await signUpPage.completeSignup(signUpData);
        Logger.step('Verifying successful signup');
        expect(await signUpPage.getSuccessMessage()).toContain('Account Created!');

        const loginData = new LoginData().getValidData();
        await homePage.navigateToLoginSignUp();
        Logger.step('Enter valid credentials and submit');
        await loginPage.loginToApplication(loginData.email, loginData.password);
        Logger.step('Verifying successful login');
        expect(await homePage.getLoggedInText()).toContain('Logged in as');
    });

    test('Verify user can delete account and cannot login again', async ({ page }) => {


        Logger.step('Clicking on Delete Account');
        await homePage.clickOnDeleteAccount();

        Logger.step('Verifying account deletion');
        await expect(page.locator('text=Account Deleted!')).toBeVisible();

        Logger.step('Click Continue');
        await deleteAccountPage.clickContinue();

        Logger.step('Trying to login with deleted account');
        await homePage.navigateToLoginSignUp();
        await loginPage.login(LoginData.email, LoginData.password);

        Logger.step('Verifying login is not allowed');

        await expect(page.locator('text=Your email or password is incorrect!')).toBeVisible();
    });

});