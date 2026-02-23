import { test } from './my_test.js';
import { expect } from '@playwright/test';


test('Add one more car', async ({ userGaragePage, page }) => {
    await expect(userGaragePage.profileDropdown).toBeVisible()
    await expect(userGaragePage.updateMileageRecent).toBeVisible()
})
