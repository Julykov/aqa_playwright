import { BaseForm } from "./BaseForm"

export class UserRegisterForm extends BaseForm {
    
    constructor(page, url) {
        super(page, url)
    }
    
    get userNameInput() {
        return this.page.locator('#signupName')
    }

    get userLastNameInput() {
        return this.page.locator('#signupLastName')
    }

    get userEmailInput() {
        return this.page.locator('#signupEmail')
    }

    get userPasswordInput() {
        return this.page.locator('#signupPassword')
    }

    get userRepeatPasswordInput() {
        return this.page.locator('#signupRepeatPassword')
    }

    get registerButton() {
        return this.page.getByRole('button', {name: 'Register'})
    }

    async openForm() {
        //await page.goto('/')
        await super.openForm();
        await this.page.getByRole('button', {name: 'Sign In'}).click()
        await this.page.getByRole('button', {name: 'Registration'}).click()
        //await page.waitForTimeout(1000);
    }

}