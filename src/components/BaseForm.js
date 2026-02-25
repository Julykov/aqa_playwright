export class BaseForm {
    
    constructor(page, url) {
        this.page = page;
        this.url = url;
    }
    
    async openForm() {
        await this.page.goto(this.url)
    }

    async populateField(fieldInput, fieldInputValue) {
        await fieldInput.fill(fieldInputValue)
        return this
    }

    async clickButton(button) {
        await button.waitFor({ state: 'visible'})
        await button.click()
        return this
    }

}