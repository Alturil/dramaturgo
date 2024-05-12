// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Log in to Swag Labs', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveTitle(/Swag Labs/);
  });
  
  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test('Login using valid credentials', async ({ page }) => {  
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Products')).toBeVisible();
  });

  test('Reject invalid credentials', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('wrong_user');
    await page.getByPlaceholder('Password').fill('wrong_password');
    await page.getByRole('button', { name: 'Login' }).click();
    
    await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
  });

});
