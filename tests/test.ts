import { expect, test } from '@playwright/test';

test('index page has loading text', async ({ page }) => {
	await page.goto('/');
	expect(await page.isVisible("text='Loading...'"));
});

test('all products loaded after loading screen', async ({ page }) => {
	await page.goto('/');
	await page.waitForSelector('img');
	const imgElements = await page.locator('img').count();
	expect(imgElements).toEqual(60);
	;
});

test('products price correctly shown', async ({ page }) => {
	await page.goto('/');
	await page.waitForSelector('img');
	const productPrice = page.locator('span:has-text("1,59 €")');
	expect(await productPrice.count()).toBeGreaterThanOrEqual(1)
});

test('searching products by name', async ({ page }) => {
	await page.goto('/');
	await page.waitForSelector('img');
	await page.locator('input').fill('EDEKA Bio H-Vollmilch');
	const productName = page.locator('span:has-text("EDEKA Bio H-Vollmilch")');
	expect(await productName.count()).toBeGreaterThanOrEqual(1)
});