const { expect } = require('@playwright/test');

exports.LoginPage = class LoginPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.usernameField = page.getByPlaceholder('Username');
    this.passwordField = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async logIn() {
    const username = process.env.PLAYWRIGHT_USERNAME || '';
    const password = process.env.PLAYWRIGHT_PASSWORD || '';

    expect(username).not.toBe('');
    expect(password).not.toBe('');

    await this.goto();
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();

    await expect(this.page.getByText('Products')).toBeVisible();
  }
};