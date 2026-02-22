import { test } from './my_test.js';
import { expect } from '@playwright/test';


test('Add one more car', async ({ userGaragePage, page }) => {
    const profileDropdown = page.locator('#userNavDropdown')
    await expect(profileDropdown).toBeVisible()

    const today = new Date().toLocaleDateString('uk-UA'); 

    const dateElement = page.locator('p.car_update-mileage', { hasText: today}).first()
    await expect(dateElement).toBeVisible()
})
