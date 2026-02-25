import { test as base } from '@playwright/test';
import { GaragePage } from '../../src/components/GaragePage';


export const test = base.extend ({
    userGaragePage: async ({page}, use) => {
        const garagePage = new GaragePage(page)
        await page.goto('/')
        
        await garagePage.clickAddCarButton()
        await garagePage.selectBrandInput('BMW')
        await garagePage.selectModelInput('Z3')
        await garagePage.typeMileageInput(115)
        await garagePage.clickAddCarFinishButton()
        
        await use(garagePage)

        await garagePage.clickEditCarButton()
        await garagePage.clickRemoveCarButton()
        await garagePage.clickRemoveCarConfirmButton()
    }
})