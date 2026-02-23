import { BaseForm } from "./BaseForm"

export class GaragePage extends BaseForm {
    
    constructor(page, url) {
        super(page, url)
    }

    get addCarButton() {
        return this.page.locator('.panel-page_heading > .btn')
    }

    get brandInput() {
        return this.page.locator('[name="carBrandId"]')
    }

    get modelInput() {
        return this.page.locator('[name="carModelId"]')
    }

    get mileageInput() {
        return this.page.locator('[name="mileage"]')
    }

    get addCarFinishButton() {
        return this.page.locator('.modal-footer > .btn-primary')
    }

    get profileDropdown() {
        return this.page.locator('#userNavDropdown')
    }

    get updateMileageRecent() {
        const today = new Date().toLocaleDateString('uk-UA');
        return this.page.locator('p.car_update-mileage', { hasText: today}).first()
    }

    get editCarButton() {
        return this.page.locator('.car_edit').first()
    }

    get removeCarButton() {
        return this.page.locator('.btn-outline-danger')
    }

    get removeCarConfirmButton() {
        return this.page.locator('.btn-danger')
    }

    async clickRemoveCarConfirmButton() {
        await this.removeCarConfirmButton.click()
    }

    async clickRemoveCarButton() {
        await this.removeCarButton.click()
    }

    async clickEditCarButton() {
        await this.editCarButton.click()
    }

    async clickAddCarButton() {
        await this.addCarButton.click()
    }

    async selectBrandInput(brandName) {                    
        if (brandName != 'Audi') {
            await this.brandInput.selectOption(brandName)
        }
    }

    async selectModelInput(modelName) {                   
        await this.modelInput.selectOption(modelName)
    }

    async typeMileageInput(mileage) {                    
        await this.mileageInput.fill(mileage.toString())
    }

    async clickAddCarFinishButton() {
        await this.addCarFinishButton.click()
    } 

}
