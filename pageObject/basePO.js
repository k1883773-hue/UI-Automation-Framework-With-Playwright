// class BasePO {
//   constructor(page) {
//     this.page = page;
//   }

//   async navigateTo(url) {
//     await this.page.goto(url);
//   }

//   async click(locator) {
//     await locator.click();
//   }

//   async enterText(locator, text) {
//     await locator.fill(text);
//   }

//   async getText(locator) {
//     return await locator.textContent();
//   }

//   async isElementVisible(locator) {
//     return await locator.isVisible();
//   }

//   async getPageTitle() {
//     return await this.page.title();
//   }

//   async getCurrentUrl() {
//     return this.page.url();
//   }
// }