import { UserRegisterForm } from '../../../src/components/UserRegisterForm';
import { checkErrorMessage, press_tab } from '../../../src/utils/HelperFunctions';
import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();


test.describe('registration, name field checks', () => {
    
    const main_page_url = process.env.BASE_URL;
    let registerForm
    
    test.beforeEach(async ({page}) => {
        registerForm = new UserRegisterForm(page, main_page_url)
        await registerForm.openForm()
    })
    
    test('Name field, error appears when name is shorter than 2 letters', async ({page}) => {
        const nameValue = 'T'
        const nameInput = registerForm.userNameInput
        await expect(nameInput).toBeEmpty()
        await registerForm.populateField(nameInput, nameValue)
        await expect(nameInput).toHaveValue(nameValue)
        await press_tab(nameInput)
        await checkErrorMessage(page, nameInput, 'Name has to be from 2 to 20 characters long')
    })

    test('Name field, error appears when name is longer than 20 letters', async ({page}) => {
        const nameValue = 'TomasTomasTomasTomasT'
        const nameInput = registerForm.userNameInput
        await expect(nameInput).toBeEmpty ()
        await registerForm.populateField(nameInput, nameValue)
        await expect(nameInput).toHaveValue(nameValue)
        await press_tab(nameInput)
        await checkErrorMessage(page, nameInput, 'Name has to be from 2 to 20 characters long')
    })

    test('Name field, error appears when name is set as 1 digit', async ({page}) => {
        const nameValue = '1'
        const nameInput = registerForm.userNameInput
        await expect(nameInput).toBeEmpty ()
        await registerForm.populateField(nameInput, nameValue)
        await expect(nameInput).toHaveValue(nameValue)
        await press_tab(nameInput)
        await checkErrorMessage(page, nameInput, 'Name is invalidName has to be from 2 to 20 characters long')
    })
    
    test('Name field, error appears when name was not set', async ({page}) => {
        const nameInput = registerForm.userNameInput
        await expect(nameInput).toBeEmpty ()
        await nameInput.focus()
        await press_tab(nameInput)
        await checkErrorMessage(page, nameInput, 'Name required')
    })    

    test('Name field, error appears when name is set as space', async ({page}) => {
        const nameValue = ' '
        const nameInput = registerForm.userNameInput
        await expect(nameInput).toBeEmpty ()
        await registerForm.populateField(nameInput, nameValue)
        await expect(nameInput).toHaveValue(nameValue)
        await press_tab(nameInput)
        await checkErrorMessage(page, nameInput, 'Name is invalidName has to be from 2 to 20 characters long')
    })

    test('Name field, error appears when name is set as letter and space', async ({page}) => {
        const nameValue = 'T '
        const nameInput = registerForm.userNameInput
        await expect(nameInput).toBeEmpty ()
        await registerForm.populateField(nameInput, nameValue)
        await expect(nameInput).toHaveValue(nameValue)
        await press_tab(nameInput)
        await checkErrorMessage(page, nameInput, 'Name is invalid')
    })

    test('Name field, error appears when name is set as special symbol', async ({page}) => {
        const nameValue = '#'
        const nameInput = registerForm.userNameInput
        await expect(nameInput).toBeEmpty ()
        await registerForm.populateField(nameInput, nameValue)
        await expect(nameInput).toHaveValue(nameValue)
        await press_tab(nameInput)
        await checkErrorMessage(page, nameInput, 'Name is invalidName has to be from 2 to 20 characters long')
    })

    test('Name field, error appears when name is set as letters and digit', async ({page}) => {
        const nameValue = 'Tom1'
        const nameInput = registerForm.userNameInput
        await expect(nameInput).toBeEmpty ()
        await registerForm.populateField(nameInput, nameValue)
        await expect(nameInput).toHaveValue(nameValue)
        await press_tab(nameInput)
        await checkErrorMessage(page, nameInput, 'Name is invalid')
    })

})