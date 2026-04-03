const base = require('@playwright/test');

exports.test = base.test.extend({

   page: async ({ page }, use) => {
    await page.goto('https://automationexercise.com/');
    await use(page);
  },
  
  loginPO: async ({ page }, use) => {
    const { LoginPO } = require('../pageObjects/loginPO');
    await use(new LoginPO(page));
  },

  logoutPO: async ({ page }, use) => {
    const { LogoutPO } = require('../pageObjects/logoutPO');
    await use(new LogoutPO(page));
  },

  signUpPO: async ({ page }, use) => {
    const { SignUpPO } = require('../pageObjects/signUpPO');
    await use(new SignUpPO(page));
  }

});

exports.expect = base.expect;