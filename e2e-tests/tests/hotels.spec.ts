import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import path from 'path';

const UI_URL = 'http://localhost:5173/';

test('should allow user to add hotel', async ({ page }) => {
    await page.goto(UI_URL);

    // Get sign in link
    await page.getByRole('link', { name: 'Sign In' }).click();

    await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();

    await page.locator('[name=email]').fill('jane@email.com');
    await page.locator('[name=password]').fill('Password@123');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible();

    await page.goto(`${UI_URL}add-hotel`);
    await expect(
        page.getByRole('heading', { name: 'Add Hotel' })
    ).toBeVisible();

    await page.locator('[name=name]').fill(faker.company.name());
    await page.locator('[name=city]').fill(faker.location.city());
    await page.locator('[name=country]').fill(faker.location.country());
    await page.locator('[name=description]').fill(faker.lorem.paragraph(2));
    await page.locator('[name=pricePerNight]').fill('150');
    await page.selectOption('[name=starRating]', '3');
    await page.getByText('Business').click();
    await page.getByLabel('Free Wi-Fi').click();
    await page.getByLabel('Parking').click();
    await page.locator('[name=adultCount]').fill('2');
    await page.locator('[name=childCount]').fill('1');
    await page.setInputFiles('[name=imageFiles]', [
        path.join(__dirname, 'files', '1.jpg'),
        path.join(__dirname, 'files', '2.jpg'),
    ]);

    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Hotel added successfully')).toBeVisible();
});
