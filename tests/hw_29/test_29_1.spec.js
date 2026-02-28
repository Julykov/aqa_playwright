import { test, expect } from '@playwright/test';
import { GaragePage } from '../../src/components/GaragePage';


test('Check mocked user name in profile', async ({ page }) => {
    await page.route('**/api/users/profile', async route => { 
        const response = await route.fetch();
        const body = await response.json();

        body.data.name = 'Samanta'
        body.data.lastName = 'Black'

        await route.fulfill({ response, json: body })
    })
    
    await page.goto('/')
    const garagePage = new GaragePage(page)
    await expect(garagePage.profileDropdown).toBeVisible()
    await garagePage.clickProfileSidebarLink()

    const profileName = garagePage.profileFullName
    await expect(profileName).toBeVisible()
    await expect(profileName).toHaveText('Samanta Black')
})
