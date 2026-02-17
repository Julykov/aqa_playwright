import { BaseForm } from "./BaseForm"


export class LoginForm extends BaseForm{
    
    constructor(page, url) {
        super(page, url)
    }
    
    get userEmailInput() {
        return this.page.locator('#signinEmail')
    }

    get userPasswordInput() {
        return this.page.locator('#signinPassword')
    }

    get loginButton() {
        return this.page.getByRole('button', {name: 'Login'})
    }    

    async openForm() {
        await super.openForm();
        await this.page.getByRole('button', {name: 'Sign In'}).click()
    }

}