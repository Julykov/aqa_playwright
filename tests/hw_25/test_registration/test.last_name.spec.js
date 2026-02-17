import { UserRegisterForm } from '../../../src/components/UserRegisterForm';
import { checkErrorMessage, press_tab } from '../../../src/utils/HelperFunctions';
import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();


test.describe('registration, last name field checks', () => {
    
    const main_page_url = process.env.BASE_URL;
    let registerForm
    
    test.beforeEach(async ({page}) => {
        registerForm = new UserRegisterForm(page, main_page_url)
        await registerForm.openForm()
    })
    
    test('Name field, error appears when last name is shorter than 2 letters', async ({page}) => {
        const lastNameValue = 'T'
        const lastNameInput = registerForm.userLastNameInput
        await expect(lastNameInput).toBeEmpty()
        await registerForm.populateField(lastNameInput, lastNameValue)
        await expect(lastNameInput).toHaveValue(lastNameValue)
        await press_tab(lastNameInput)
        await checkErrorMessage(page, lastNameInput, 'Last name has to be from 2 to 20 characters long')
    })

    test('Last name field, error appears when last name is longer than 20 letters', async ({page}) => {
        const lastNameValue = 'TomasTomasTomasTomasT'
        const lastNameInput = registerForm.userLastNameInput
        await expect(lastNameInput).toBeEmpty ()
        await registerForm.populateField(lastNameInput, lastNameValue)
        await expect(lastNameInput).toHaveValue(lastNameValue)
        await press_tab(lastNameInput)
        await checkErrorMessage(page, lastNameInput, 'Last name has to be from 2 to 20 characters long')
    })

    test('Last name field, error appears when last name is set as 1 digit', async ({page}) => {
        const lastNameValue = '1'
        const lastNameInput = registerForm.userLastNameInput
        await expect(lastNameInput).toBeEmpty ()
        await registerForm.populateField(lastNameInput, lastNameValue)
        await expect(lastNameInput).toHaveValue(lastNameValue)
        await press_tab(lastNameInput)
        await checkErrorMessage(page, lastNameInput, 'Last name is invalidLast name has to be from 2 to 20 characters long')
    })

    test('Last name field, error appears when last name was not set', async ({page}) => {
        const lastNameInput = registerForm.userLastNameInput
        await expect(lastNameInput).toBeEmpty ()
        await lastNameInput.focus()
        await press_tab(lastNameInput)
        await checkErrorMessage(page, lastNameInput, 'Last name required')
    })

    test('Last name field, error appears when last name is set as space', async ({page}) => {
        const lastNameValue = ' '
        const lastNameInput = registerForm.userLastNameInput
        await expect(lastNameInput).toBeEmpty ()
        await registerForm.populateField(lastNameInput, lastNameValue)
        await expect(lastNameInput).toHaveValue(lastNameValue)
        await press_tab(lastNameInput)
        await checkErrorMessage(page, lastNameInput, 'Last name is invalidLast name has to be from 2 to 20 characters long')
    })

    test('Last name field, error appears when last name is set as letter and space', async ({page}) => {
        const lastNameValue = 'T '
        const lastNameInput = registerForm.userLastNameInput
        await expect(lastNameInput).toBeEmpty ()
        await registerForm.populateField(lastNameInput, lastNameValue)
        await expect(lastNameInput).toHaveValue(lastNameValue)
        await press_tab(lastNameInput)
        await checkErrorMessage(page, lastNameInput, 'Last name is invalid')
    })
        
    test('Last name field, error appears when last name is set as special symbol', async ({page}) => {
        const lastNameValue = '#'
        const lastNameInput = registerForm.userLastNameInput
        await expect(lastNameInput).toBeEmpty ()
        await registerForm.populateField(lastNameInput, lastNameValue)
        await expect(lastNameInput).toHaveValue(lastNameValue)
        await press_tab(lastNameInput)
        await checkErrorMessage(page, lastNameInput, 'Last name is invalidLast name has to be from 2 to 20 characters long')
    })

    test('Last name field, error appears when last name is set as letters and digit', async ({page}) => {
        const lastNameValue = 'Tom1'
        const lastNameInput = registerForm.userLastNameInput
        await expect(lastNameInput).toBeEmpty ()
        await registerForm.populateField(lastNameInput, lastNameValue)
        await expect(lastNameInput).toHaveValue(lastNameValue)
        await press_tab(lastNameInput)
        await checkErrorMessage(page, lastNameInput, 'Last name is invalid')
    })

})