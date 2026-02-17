import { UserRegisterForm } from '../../../src/components/UserRegisterForm';
import { checkErrorMessage, press_tab } from '../../../src/utils/HelperFunctions';
import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();


test.describe('registration, email field checks', () => {
    
    const main_page_url = process.env.BASE_URL;
    let registerForm
    
    test.beforeEach(async ({page}) => {
        registerForm = new UserRegisterForm(page, main_page_url)
        await registerForm.openForm()
    })
    
    test('Email field, error appears when email has incorrect format', async ({page}) => {
        const EmailValue = 'gmail.com'
        const emailInput = registerForm.userEmailInput 
        await expect(emailInput).toBeEmpty ()
        await registerForm.populateField(emailInput, EmailValue)
        await expect(emailInput).toHaveValue(EmailValue)
        await press_tab(emailInput)
        await checkErrorMessage(page, emailInput, 'Email is incorrect')
    })

    test('Email field, error appears when email was not set', async ({page}) => {
        const emailInput = registerForm.userEmailInput 
        await emailInput.focus()
        await press_tab(emailInput)
        await checkErrorMessage(page, emailInput, 'Email required')
    })

})