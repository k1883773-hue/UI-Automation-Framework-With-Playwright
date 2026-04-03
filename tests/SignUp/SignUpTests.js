import { test, expect } from '@playwright/test';
import { SignupData } from '../../dataFactory/signUpData/signUpData.js';
import { SignupPO } from '../../pageObject/SignUpPO.js';
import { config } from '../../utilities/config.js';
import Logger from '../../utilities/logs.js';

test.describe('Signup Tests', () => {

  let signUpPage;

  test.beforeEach(async ({ page }) => {

    signUpPage = new SignupPO(page);

    Logger.step('Navigating to application');
    await page.goto(config.url.local);

    Logger.step('Clicking on Signup Link');
    await signUpPage.navigateToSignup();
  });

  test('Verify user signup with valid credentials', async () => {

    const signUpData = SignupData.createValidSignupData();

    Logger.step('Enter valid signup details and submit');
    await signUpPage.signupWithNameAndEmail(signUpData.name, signUpData.email);
    await signUpPage.completeSignup(signUpData);
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

});