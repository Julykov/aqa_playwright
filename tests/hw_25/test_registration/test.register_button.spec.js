import { UserRegisterForm } from '../../../src/components/UserRegisterForm';
import { checkErrorMessage, press_tab, generateAndLogEmail } from '../../../src/utils/HelperFunctions';
import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();


test.describe('register button, checks', () => {
    
    const main_page_url = process.env.BASE_URL;
    let registerForm
    
    test.beforeEach(async ({page}) => {
        registerForm = new UserRegisterForm(page, main_page_url)
        await registerForm.openForm()
    })
    
    test('Register button, inactive when one of fields populated incorrectly', async ({page}) => {
        const nameInput = registerForm.userNameInput 
        await expect(nameInput).toBeEmpty ()
        await registerForm.populateField(nameInput, 'Tomas')
        await expect(nameInput).toHaveValue('Tomas')
        await press_tab(nameInput)
        
        const lastNameInput = registerForm.userLastNameInput
        await expect(lastNameInput).toBeEmpty ()
        await registerForm.populateField(lastNameInput, 'Smith')
        await expect(lastNameInput).toHaveValue('Smith')
        await press_tab(lastNameInput)

        const emailInput = registerForm.userEmailInput   
        await expect(emailInput).toBeEmpty ()
        await registerForm.populateField(emailInput, '_emailname4@gmail.com')
        await expect(emailInput).toHaveValue('_emailname4@gmail.com')
        await press_tab(emailInput)

        const passwordInput = registerForm.userPasswordInput    
        await expect(passwordInput).toBeEmpty ()
        await registerForm.populateField(passwordInput, 'WorldWorldWord1')
        await press_tab(passwordInput)
        
        const repeatPasswordInput = registerForm.userRepeatPasswordInput 
        await expect(repeatPasswordInput).toBeEmpty ()
        await registerForm.populateField(repeatPasswordInput, 'WorldWorldWord2')
        await press_tab(repeatPasswordInput)
        
        const registerButton = registerForm.registerButton
        await expect(registerForm.registerButton).toHaveAttribute('Disabled')
    })

    test('Register button active, new user created', async ({page}) => {
        const nameInput = registerForm.userNameInput 
        await expect(nameInput).toBeEmpty ()
        await registerForm.populateField(nameInput, 'Tomas')
        await expect(nameInput).toHaveValue('Tomas')
        await press_tab(nameInput)
        
        const lastNameInput = registerForm.userLastNameInput
        await expect(lastNameInput).toBeEmpty ()
        await registerForm.populateField(lastNameInput, 'Smith')
        await expect(lastNameInput).toHaveValue('Smith')
        await press_tab(lastNameInput)


        const emailInput = registerForm.userEmailInput   
        const emailInputValue = generateAndLogEmail();
        await expect(emailInput).toBeEmpty ()
        await registerForm.populateField(emailInput, emailInputValue)
        await expect(emailInput).toHaveValue(emailInputValue)
        await press_tab(emailInput)

        const passwordInput = registerForm.userPasswordInput    
        await expect(passwordInput).toBeEmpty ()
        await registerForm.populateField(passwordInput, 'WorldWorldWord1')
        await press_tab(passwordInput)
        
        const repeatPasswordInput = registerForm.userRepeatPasswordInput 
        await expect(repeatPasswordInput).toBeEmpty ()
        await registerForm.populateField(repeatPasswordInput, 'WorldWorldWord1')
        await press_tab(repeatPasswordInput)
        
        registerForm.clickButton(registerForm.registerButton)
        const profileDropdown = page.locator('#userNavDropdown')
        await expect(profileDropdown).toBeVisible()

    })

})