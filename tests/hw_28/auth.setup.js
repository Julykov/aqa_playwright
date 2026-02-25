import { LoginForm } from '../../src/components/LoginForm';
import { test as setup, expect } from '@playwright/test';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();


const authFile = 'playwright/.auth/user.json';
const main_page_url = process.env.BASE_URL;

setup('authenticate', async ({page}) => {
    
    const loginForm = new LoginForm(page, main_page_url)
    await loginForm.openForm()
    const emailInput = loginForm.userEmailInput
    await loginForm.populateField(emailInput, '_emailname6@gmail.com')
    const passwordInput = loginForm.userPasswordInput
    await loginForm.populateField(passwordInput, 'WorldWorldWord1')
    await loginForm.clickButton(loginForm.loginButton)

    await page.waitForURL('**/panel/garage')
    await expect(page.getByRole('button', { name: 'Add car'})).toBeVisible();

    const state = await page.context().storageState()
    
    const cleanState = {
        cookies: state.cookies.filter(cookie => {return cookie.domain.includes('forstudy.space')}),
        origins: state.origins.filter(entry => {return entry.origin.includes('forstudy.space')}),
    }

    fs.writeFileSync(authFile, JSON.stringify(cleanState, null, 2), 'utf-8')

})

