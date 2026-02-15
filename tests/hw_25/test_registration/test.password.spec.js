import { UserRegisterForm } from '../../../src/components/UserRegisterForm';
import { checkErrorMessage, press_tab } from '../../../src/utils/HelperFunctions';
import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();


test.describe('registration, password field checks', () => {
    
    const main_page_url = process.env.BASE_URL;
    let registerForm;
    const password_content_error_text = 'Password has to be from 8 to 15 characters long and \
                                            contain at least one integer, one capital, and one small letter';
    
    test.beforeEach(async ({page}) => {
        registerForm = new UserRegisterForm(page, main_page_url)
        await registerForm.openForm()
    })
    
    test('Password field, error appears when password was not set', async ({page}) => {
        const passwordInput = registerForm.userPasswordInput    
        await passwordInput.focus()
        await press_tab(passwordInput)
        await checkErrorMessage(page, 'Password required')
    })  

    test('Password field, error appears when password length is less than 8', async ({page}) => {
        const passwordInput = registerForm.userPasswordInput 
        const short_password = 'SHORT'
        await expect(passwordInput).toBeEmpty ()
        await registerForm.populateField(passwordInput, short_password)
        await expect(passwordInput).toHaveValue(short_password)
        await press_tab(passwordInput)
        await checkErrorMessage(page, password_content_error_text)
    })
    
    test('Password field, error appears when password length is longer than 15 symbols', async ({page}) => {
        const PasswordValue = 'WordWordWordWord1'
        const passwordInput = registerForm.userPasswordInput 
        await expect(passwordInput).toBeEmpty ()
        await registerForm.populateField(passwordInput, PasswordValue)
        await expect(passwordInput).toHaveValue(PasswordValue)
        await press_tab(passwordInput)
        await checkErrorMessage(page, password_content_error_text)
    })

    test('Password field, error appears when password contains none digits', async ({page}) => {
        const PasswordValue = 'WorldWorldWorld'
        const passwordInput = page.locator('#signupPassword')
        await expect(passwordInput).toBeEmpty ()
        await registerForm.populateField(passwordInput, PasswordValue)
        await expect(passwordInput).toHaveValue(PasswordValue)
        await press_tab(passwordInput)
        await checkErrorMessage(page, password_content_error_text)
    })

    test('Password field, error appears when password contains none capital', async ({page}) => {
        const PasswordValue = 'worldworldword1'
        const passwordInput = page.locator('#signupPassword')
        await expect(passwordInput).toBeEmpty ()
        await registerForm.populateField(passwordInput, PasswordValue)
        await expect(passwordInput).toHaveValue(PasswordValue)
        await press_tab(passwordInput)
        await checkErrorMessage(page, password_content_error_text)
    })

    test('Password field, error appears when password contains none lower-cased letter', async ({page}) => {
        const PasswordValue = 'WORLDWORLDWORLDWORD1'
        const passwordInput = page.locator('#signupPassword')
        await expect(passwordInput).toBeEmpty ()
        await registerForm.populateField(passwordInput, PasswordValue)
        await expect(passwordInput).toHaveValue(PasswordValue)
        await press_tab(passwordInput)
        await checkErrorMessage(page, password_content_error_text)
    })

})