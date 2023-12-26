import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

const UI_URL = 'http://localhost:5173/';

test('should allow user to sign in', async ({ page }) => {
    await page.goto(UI_URL);

    // Get sign in link
    await page.getByRole('link', { name: 'Sign In' }).click();

    await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();

    await page.locator('[name=email]').fill('jane@email.com');
    await page.locator('[name=password]').fill('Password@123');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible();
});

test('should allow user to register', async ({ page }) => {
    await page.goto(UI_URL);

    await page.getByRole('link', { name: 'Sign In' }).click();
    await page.getByRole('link', { name: 'Register here' }).click();

    await page.locator('[name=firstName]').fill(faker.person.firstName());
    await page.locator('[name=lastName]').fill(faker.person.lastName());
    await page.locator('[name=email]').fill(faker.internet.email());
    await page.locator('[name=password]').fill('Password@123');
    await page.locator('[name=confirmPassword]').fill('Password@123');

    await page.getByRole('button', { name: 'Create Account' }).click();

    await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible();
});
