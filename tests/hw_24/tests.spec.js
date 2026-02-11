import { test, expect } from '@playwright/test';


test.describe('registration', () => {
    
    const main_page = 'https://qauto.forstudy.space/'
    
    test.beforeEach(async ({page}) => {
        await page.goto(main_page)
        await page.getByRole('button', {name: 'Sign In'}).click()
        await page.getByRole('button', {name: 'Registration'}).click()
        //await page.waitForTimeout(1000);
    })
    
    async function checkErrorMessage(page, error_message_text) {
        //await page.waitForTimeout(1000);
        const error_message = page.locator('div.invalid-feedback')
        await expect(error_message).toHaveText(error_message_text)
        await expect(error_message).toHaveCSS('color', 'rgb(220, 53, 69)')   //#dc3545
        await page.waitForTimeout(1000);
    }

    test.describe('name field checks', () => {
        
        // test.beforeEach(async ({page}) => {
        //     await page.goto(main_page)
        //     await page.getByRole('button', {name: 'Sign In'}).click()
        //     await page.getByRole('button', {name: 'Registration'}).click()
        //     //await page.waitForTimeout(1000);
        // })

        
        // async function checkErrorMessage(page, error_message_text) {
        //     //await page.waitForTimeout(1000);
        //     const error_message = page.locator('div.invalid-feedback')
        //     await expect(error_message).toHaveText(error_message_text)
        //     await expect(error_message).toHaveCSS('color', 'rgb(220, 53, 69)')   //#dc3545
        //     await page.waitForTimeout(1000);
        // }

        test('Name field, error appears when name is shorter than 2 letters', async ({page}) => {
            const nameInput = page.locator('#signupName')   //page.getByRole('textbox', {name: 'name'})
            await expect(nameInput).toBeEmpty ()
            await nameInput.fill('T')
            await expect(nameInput).toHaveValue('T')
            await nameInput.press('Tab')
            await checkErrorMessage(page, 'Name has to be from 2 to 20 characters long')
        })

        test('Name field, error appears when name is longer than 20 letters', async ({page}) => {
            const nameInput = page.locator('#signupName')
            await expect(nameInput).toBeEmpty ()
            await nameInput.fill('TomasTomasTomasTomasT')
            await expect(nameInput).toHaveValue('TomasTomasTomasTomasT')
            await nameInput.press('Tab')
            await checkErrorMessage(page, 'Name has to be from 2 to 20 characters long')
        })

        test('Name field, error appears when name is set as 1 digit', async ({page}) => {
            const nameInput = page.locator('#signupName')
            await expect(nameInput).toBeEmpty ()
            await nameInput.fill('1')
            await expect(nameInput).toHaveValue('1')
            await nameInput.press('Tab')
            await checkErrorMessage(page, 'Name is invalidName has to be from 2 to 20 characters long')
        })

        test('Name field, error appears when name was not set', async ({page}) => {
            const nameInput = page.locator('#signupName')
            await expect(nameInput).toBeEmpty ()
            await nameInput.focus()
            await nameInput.press('Tab')
            await checkErrorMessage(page, 'Name required')
        })

        test('Name field, error appears when name is set as space', async ({page}) => {
            const nameInput = page.locator('#signupName')
            await expect(nameInput).toBeEmpty ()
            await nameInput.fill(' ')
            await expect(nameInput).toHaveValue(' ')
            await nameInput.press('Tab')
            await checkErrorMessage(page, 'Name is invalidName has to be from 2 to 20 characters long')
        })

        test('Name field, error appears when name is set as letter and space', async ({page}) => {
            const nameInput = page.locator('#signupName')
            await expect(nameInput).toBeEmpty ()
            await nameInput.fill('T ')
            await expect(nameInput).toHaveValue('T ')
            await nameInput.press('Tab')
            await checkErrorMessage(page, 'Name is invalid')
        })

        test('Name field, error appears when name is set as special symbol', async ({page}) => {
            const nameInput = page.locator('#signupName')
            await expect(nameInput).toBeEmpty ()
            await nameInput.fill('#')
            await expect(nameInput).toHaveValue('#')
            await nameInput.press('Tab')
            await checkErrorMessage(page, 'Name is invalidName has to be from 2 to 20 characters long')
        })

        test('Name field, error appears when name is set as letters and digit', async ({page}) => {
            const nameInput = page.locator('#signupName')
            await expect(nameInput).toBeEmpty ()
            await nameInput.fill('Tom1')
            await expect(nameInput).toHaveValue('Tom1')
            await nameInput.press('Tab')
            await checkErrorMessage(page, 'Name is invalid')
        })
    })


    test.describe('Last name field checks', () => {
        
        test('Last name field, error appears when last name is shorter than 2 letters', async ({page}) => {
            const lastNameInput = page.locator('#signupLastName')
            await expect(lastNameInput).toBeEmpty ()
            await lastNameInput.fill('T')
            await expect(lastNameInput).toHaveValue('T')
            await lastNameInput.press('Tab')
            await checkErrorMessage(page, 'Last name has to be from 2 to 20 characters long')
        })

        test('Last name field, error appears when last name is longer than 20 letters', async ({page}) => {
            const lastNameInput = page.locator('#signupLastName')
            await expect(lastNameInput).toBeEmpty ()
            await lastNameInput.fill('TomasTomasTomasTomasT')
            await expect(lastNameInput).toHaveValue('TomasTomasTomasTomasT')
            await lastNameInput.press('Tab')
            await checkErrorMessage(page, 'Last name has to be from 2 to 20 characters long')
        })

        test('Last name field, error appears when last name is set as 1 digit', async ({page}) => {
            const lastNameInput = page.locator('#signupLastName')
            await expect(lastNameInput).toBeEmpty ()
            await lastNameInput.fill('1')
            await expect(lastNameInput).toHaveValue('1')
            await lastNameInput.press('Tab')
            await checkErrorMessage(page, 'Last name is invalidLast name has to be from 2 to 20 characters long')
        })

        test('Last name field, error appears when last name was not set', async ({page}) => {
            const lastNameInput = page.locator('#signupLastName')
            await expect(lastNameInput).toBeEmpty ()
            await lastNameInput.focus()
            await lastNameInput.press('Tab')
            await checkErrorMessage(page, 'Last name required')
        })

        test('Last name field, error appears when last name is set as space', async ({page}) => {
            const lastNameInput = page.locator('#signupLastName')
            await expect(lastNameInput).toBeEmpty ()
            await lastNameInput.fill(' ')
            await expect(lastNameInput).toHaveValue(' ')
            await lastNameInput.press('Tab')
            await checkErrorMessage(page, 'Last name is invalidLast name has to be from 2 to 20 characters long')
        })

        test('Last name field, error appears when last name is set as letter and space', async ({page}) => {
            const lastNameInput = page.locator('#signupLastName')
            await expect(lastNameInput).toBeEmpty ()
            await lastNameInput.fill('T ')
            await expect(lastNameInput).toHaveValue('T ')
            await lastNameInput.press('Tab')
            await checkErrorMessage(page, 'Last name is invalid')
        })

        test('Last name field, error appears when last name is set as special symbol', async ({page}) => {
            const lastNameInput = page.locator('#signupLastName')
            await expect(lastNameInput).toBeEmpty ()
            await lastNameInput.fill('#')
            await expect(lastNameInput).toHaveValue('#')
            await lastNameInput.press('Tab')
            await checkErrorMessage(page, 'Last name is invalidLast name has to be from 2 to 20 characters long')
        })

        test('Last name field, error appears when last name is set as letters and digit', async ({page}) => {
            const lastNameInput = page.locator('#signupLastName')
            await expect(lastNameInput).toBeEmpty ()
            await lastNameInput.fill('Tom1')
            await expect(lastNameInput).toHaveValue('Tom1')
            await lastNameInput.press('Tab')
            await checkErrorMessage(page, 'Last name is invalid')
        })
    })


    test.describe('Email field checks', () => {
        
        test('Email field, error appears when email has incorrect format', async ({page}) => {
            const emailInput = page.locator('#signupEmail')   
            await expect(emailInput).toBeEmpty ()
            await emailInput.fill('gmail.com')
            await expect(emailInput).toHaveValue('gmail.com')
            await emailInput.press('Tab')
            await checkErrorMessage(page, 'Email is incorrect')
        })

        test('Email field, error appears when email was not set', async ({page}) => {
            const emailInput = page.locator('#signupEmail')   
            await emailInput.focus()
            await emailInput.press('Tab')
            await checkErrorMessage(page, 'Email required')
        })
    })


    test.describe('Password field checks', () => {
        
        const password_content_error_text = 'Password has to be from 8 to 15 characters long and \
                                            contain at least one integer, one capital, and one small letter'

        test('Password field, error appears when password was not set', async ({page}) => {
            const passwordInput = page.locator('#signupPassword')   
            await passwordInput.focus()
            await passwordInput.press('Tab')
            await checkErrorMessage(page, 'Password required')
        })        
        
        test('Password field, error appears when password length is less than 8', async ({page}) => {
            const passwordInput = page.locator('#signupPassword')
            const short_password = 'SHORT'
            await expect(passwordInput).toBeEmpty ()
            await passwordInput.fill(short_password)
            await passwordInput.press('Tab')
            await checkErrorMessage(page, password_content_error_text)
        })

        test('Password field, error appears when password length is longer than 15 symbols', async ({page}) => {
            const passwordInput = page.locator('#signupPassword')
            await expect(passwordInput).toBeEmpty ()
            await passwordInput.fill('WordWordWordWord1')
            await passwordInput.press('Tab')
            await checkErrorMessage(page, password_content_error_text)
        })

        test('Password field, error appears when password contains none digits', async ({page}) => {
            const passwordInput = page.locator('#signupPassword')
            await expect(passwordInput).toBeEmpty ()
            await passwordInput.fill('WorldWorldWorld')
            await passwordInput.press('Tab')
            await checkErrorMessage(page, password_content_error_text)
        })

        test('Password field, error appears when password contains none capital', async ({page}) => {
            const passwordInput = page.locator('#signupPassword')
            await expect(passwordInput).toBeEmpty ()
            await passwordInput.fill('worldworldword1')
            await passwordInput.press('Tab')
            await checkErrorMessage(page, password_content_error_text)
        })

        test('Password field, error appears when password contains none lower-cased letter', async ({page}) => {
            const passwordInput = page.locator('#signupPassword')
            await expect(passwordInput).toBeEmpty ()
            await passwordInput.fill('WORLDWORLDWORLDWORD1')
            await passwordInput.press('Tab')
            await checkErrorMessage(page, password_content_error_text)
        })
    })

    
    test.describe('Re-enter password field checks', () => {
        
        const password_repeat_error_msg = 'Passwords do not match'
        const password_empty = 'Re-enter password required'

        test('Second password field, error appears when the second password was not set', async ({page}) => {
            const repeatPasswordInput = page.locator('#signupRepeatPassword')   
            await repeatPasswordInput.focus()
            await repeatPasswordInput.press('Tab')
            await checkErrorMessage(page, password_empty)
        })        
        
        test('Repeat password field, error appears when password doesnt match to first password', async ({page}) => {
            const passwordInput = page.locator('#signupPassword')
            await expect(passwordInput).toBeEmpty ()
            await passwordInput.fill('WorldWorldWord1')
            await passwordInput.press('Tab')
            const repeatPasswordInput = page.locator('#signupRepeatPassword')
            await expect(repeatPasswordInput).toBeEmpty ()
            await repeatPasswordInput.fill('WorldWorldWord2')
            await repeatPasswordInput.press('Tab')
            await checkErrorMessage(page, password_repeat_error_msg)
        })

    })
    
    
    test.describe('Register button', () => {
        
        test('Register button active, new user created', async ({page}) => {
            const nameInput = page.locator('#signupName')   
            await expect(nameInput).toBeEmpty ()
            await nameInput.fill('Tomas')
            await expect(nameInput).toHaveValue('Tomas')
            await nameInput.press('Tab')
            
            const lastNameInput = page.locator('#signupLastName')
            await expect(lastNameInput).toBeEmpty ()
            await lastNameInput.fill('Smith')
            await expect(lastNameInput).toHaveValue('Smith')
            await lastNameInput.press('Tab')

            const emailInput = page.locator('#signupEmail')   
            await expect(emailInput).toBeEmpty ()
            await emailInput.fill('_emailname5@gmail.com')
            await expect(emailInput).toHaveValue('_emailname5@gmail.com')
            await emailInput.press('Tab')

            const passwordInput = page.locator('#signupPassword')
            await expect(passwordInput).toBeEmpty ()
            await passwordInput.fill('WorldWorldWord1')
            await passwordInput.press('Tab')
            
            const repeatPasswordInput = page.locator('#signupRepeatPassword')
            await expect(repeatPasswordInput).toBeEmpty ()
            await repeatPasswordInput.fill('WorldWorldWord1')
            await repeatPasswordInput.press('Tab')
            
            await page.getByRole('button', {name: 'Register'}).click()
            const profileDropdown = page.locator('#userNavDropdown')
            await expect(profileDropdown).toBeVisible()

        })

        test('Register button, inactive when one of fields populated incorrectly', async ({page}) => {
            const nameInput = page.locator('#signupName')   
            await expect(nameInput).toBeEmpty ()
            await nameInput.fill('Tomas')
            await expect(nameInput).toHaveValue('Tomas')
            await nameInput.press('Tab')
            
            const lastNameInput = page.locator('#signupLastName')
            await expect(lastNameInput).toBeEmpty ()
            await lastNameInput.fill('Smith')
            await expect(lastNameInput).toHaveValue('Smith')
            await lastNameInput.press('Tab')

            const emailInput = page.locator('#signupEmail')   
            await expect(emailInput).toBeEmpty ()
            await emailInput.fill('_emailname4@gmail.com')
            await expect(emailInput).toHaveValue('_emailname4@gmail.com')
            await emailInput.press('Tab')

            const passwordInput = page.locator('#signupPassword')
            await expect(passwordInput).toBeEmpty ()
            await passwordInput.fill('WorldWorldWord1')
            await passwordInput.press('Tab')
            
            const repeatPasswordInput = page.locator('#signupRepeatPassword')
            await expect(repeatPasswordInput).toBeEmpty ()
            await repeatPasswordInput.fill('WorldWorldWord2')
            await repeatPasswordInput.press('Tab')
            
            const registerButton = page.getByRole('button', {name: 'Register'})
            await expect(registerButton).toHaveAttribute('Disabled')
        })
    })

})


test.describe('registration', () => {
    
    const main_page = 'https://qauto.forstudy.space/'
    
    test.describe('name field checks', () => {
        
        test('Login to the site with correct credentials', async ({page}) => {
            await page.goto(main_page)
            await page.getByRole('button', {name: 'Sign In'}).click()
            const emailInput = page.locator('#signinEmail')
            await emailInput.fill('_emailname5@gmail.com')
            const passwordInput = page.locator('#signinPassword')
            await passwordInput.fill('WorldWorldWord1')
            await page.getByRole('button', {name: 'Login'}).click()
            const profileDropdown = page.locator('#userNavDropdown')
            await expect(profileDropdown).toBeVisible()
            await page.waitForTimeout(1000);
        })
    })
})