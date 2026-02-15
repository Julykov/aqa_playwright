import { LoginForm } from '../../../src/components/LoginForm';
import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();


const main_page_url = process.env.BASE_URL;

test.describe('login form checks', () => {
    
    test('Login to the site with correct credentials', async ({page}) => {
        const loginForm = new LoginForm(page, main_page_url)
        await loginForm.openForm()

        const emailInput = loginForm.userEmailInput
        await expect(emailInput).toBeEmpty()
        loginForm.populateField(emailInput, '_emailname6@gmail.com')
        await expect(emailInput).toHaveValue('_emailname6@gmail.com')

        const passwordInput = loginForm.userPasswordInput
        await expect(passwordInput).toBeEmpty()
        loginForm.populateField(passwordInput, 'WorldWorldWord1')
        await expect(passwordInput).toHaveValue('WorldWorldWord1')
    
        loginForm.clickButton(loginForm.loginButton)
        
        const profileDropdown = page.locator('#userNavDropdown')
        await expect(profileDropdown).toBeVisible()
    })
})