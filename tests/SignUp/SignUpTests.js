import { test, expect } from '@playwright/test';
import { SignupData } from '../../dataFactory/SignUpData/SignUpData.js';
import { SignupPO } from '../../pageObject/SignUpPO.js';
import { HomePO } from '../../pageObject/HomePO.js';  
import { config } from '../../utilities/config.js';
import Logger from '../../utilities/logs.js';

test.describe('Signup Tests', () => {

  let signUpPage;
  let homePage;

  test.beforeEach(async ({ page }) => {

    signUpPage = new SignupPO(page);
    homePage = new HomePO(page);

    Logger.step('Navigating to application');
    await page.goto(config.url.local);

    Logger.step('Clicking on Signup Link');
    await homePage.navigateToLoginSignUp();
  });

  test('Verify user signup with valid credentials', async () => {

    const signUpData = SignupData.createValidSignupData();

    Logger.step('Enter valid signup details and submit');
    await signUpPage.fillSignupDetails(signUpData);

    Logger.step('Verifying successful signup');
    expect(await signUpPage.getSuccessMessage()).toContain('Account Created!');
  });

  test('Verify error message for existing email signup', async () => {
    const signUpData = SignupData.createSignupWithExistingEmail();

    Logger.step('Signing up with existing email');
    await signUpPage.signupWithNameAndEmail(signUpData.name, signUpData.email);

    Logger.step('Verifying error message for existing email');
    expect(await signUpPage.getErrorMessage()).toContain('Email Address already exist!');
  });

   test('Verify error message for empty fields', async () => {

    Logger.step('Click signup without entering credentials');
    await signUpPage.clickOnSignupButton();

    Logger.step('Verifying validation message for empty fields');
    const emailValidation = await signUpPage.getEmailRequiredMessage();
    expect(emailValidation).toMatch(/fill/i);
  });

});