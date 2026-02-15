export class BaseForm {
    
    constructor(page, url) {
        this.page = page;
        this.url = url;
    }
    
    async openForm() {
        await this.page.goto(this.url)
    }

    populateField(fieldInput, fieldInputValue) {
        fieldInput.fill(fieldInputValue)
        return this
    }

    clickButton(button) {
        button.click()
        return this
    }

}