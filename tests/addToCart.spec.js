// @ts-check
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('./page-object-models/login');

test.describe('add a product to cart', () => {
    
    test.beforeEach(async ({ page })=>{
        const loginPage = new LoginPage(page);
        await loginPage.logIn();
    });

    test('add product to cart', async ({ page }) => {  

        const firstItem = page.locator('.inventory_item').first()

        const itemData = {
            title : await firstItem.locator('[data-test="inventory-item-name"]').textContent(),
            price : await firstItem.locator('[data-test="inventory-item-price"]').textContent(),
            image : await firstItem.getByRole('img').getAttribute('src')
        }

        await firstItem.getByRole('button', { name : 'Add to cart' }).click();
        await expect(firstItem.getByRole('button', { name : 'Remove' })).toBeVisible();
        const badgeCount = Number(await page.locator('[data-test="shopping-cart-badge"]').textContent());
        expect(badgeCount).toBe(1);
    });

    test('remove added item', async ({ page }) => {
        const firstItem = page.locator('.inventory_item').nth(2);
        const addToCartButton = firstItem.getByRole('button', { name : 'Add to cart' });
        await addToCartButton.click();

        const removeButton = firstItem.getByRole('button', { name : 'Remove' });
        await expect(removeButton).toBeVisible();
        const badgeCount = page.locator('[data-test="shopping-cart-badge"]');
        expect(Number(await badgeCount.textContent())).toBe(1);

        await removeButton.click();
        await expect(addToCartButton).toBeVisible();
        await expect(badgeCount).not.toBeVisible();
    });

});
