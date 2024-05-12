// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Log in to Swag Labs', () => {
  
  const username = process.env.PLAYWRIGHT_USERNAME || '';
  const password = process.env.PLAYWRIGHT_PASSWORD || '';

  expect(username).not.toBe('');
  expect(password).not.toBe('');

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveTitle(/Swag Labs/);
  });
  
  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test('login using valid credentials', async ({ page }) => {  
    await page.getByPlaceholder('Username').fill(username);
    await page.getByPlaceholder('Password').fill(password);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Products')).toBeVisible();
  });

  test('reject invalid credentials', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('wrong_user');
    await page.getByPlaceholder('Password').fill('wrong_password');
    await page.getByRole('button', { name: 'Login' }).click();
    
    await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
  });

});
