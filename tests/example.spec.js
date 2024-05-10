// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Trade me search', () => {
  
  let page;
  
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('navigate to Trade Me', async () => {
    await page.goto('https://trademe.co.nz/');
    await expect(page).toHaveTitle(/Buy & Sell on NZ's #1 Auction & Classifieds Site | Trade ME/);
  });

  test('search for "Potato"', async () => {
    await page.locator('#search').fill('Potato');
    await page.keyboard.down('Enter');
    await expect(page).toHaveTitle(/'Potato' for sale | Trade Me/);
  });
});