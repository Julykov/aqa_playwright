import { UserRegisterForm } from '../../../src/components/UserRegisterForm';
import { checkErrorMessage, press_tab } from '../../../src/utils/HelperFunctions';
import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();


test.describe('registration, repeat password field checks', () => {
    
    const main_page_url = process.env.BASE_URL;
    let registerForm;
    const password_repeat_error_msg = 'Passwords do not match'
    const password_empty = 'Re-enter password required'
    
    test.beforeEach(async ({page}) => {
        registerForm = new UserRegisterForm(page, main_page_url)
        await registerForm.openForm()
    })
    
    test('Second password field, error appears when the second password was not set', async ({page}) => {
        const repeatPasswordInput = registerForm.userRepeatPasswordInput    
        await repeatPasswordInput.focus()
        await press_tab(repeatPasswordInput)
        await checkErrorMessage(page, password_empty)
    })  

    test('Repeat password field, error appears when password doesnt match to first password', async ({page}) => {
        const passwordValue1 = 'WorldWorldWord1'
        const passwordInput = registerForm.userPasswordInput 
        await expect(passwordInput).toBeEmpty ()
        await registerForm.populateField(passwordInput, passwordValue1)
        await expect(passwordInput).toHaveValue(passwordValue1)
        await press_tab(passwordInput)
        const passwordValue2 = 'WorldWorldWord2'
        const repeatPasswordInput = registerForm.userRepeatPasswordInput 
        await expect(repeatPasswordInput).toBeEmpty ()
        await registerForm.populateField(repeatPasswordInput, passwordValue2)
        await expect(repeatPasswordInput).toHaveValue(passwordValue2)
        await press_tab(repeatPasswordInput)
        await checkErrorMessage(page, password_repeat_error_msg)
    })
    
})