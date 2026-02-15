    import { expect } from '@playwright/test';
    import path from 'path';
    import fs from 'fs';


    export async function checkErrorMessage(page, error_message_text) {
        //await page.waitForTimeout(1000);
        const error_message = page.locator('div.invalid-feedback')
        await expect(error_message).toHaveText(error_message_text)
        await expect(error_message).toHaveCSS('color', 'rgb(220, 53, 69)')   //#dc3545
        await page.waitForTimeout(1000);
    }

    export async function press_tab(inputField) {
        await inputField.press('Tab')
    }

    export function generateAndLogEmail() {
        const now = new Date();
        const datePart = now.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: '2-digit' }).replace(/\./g, '');
        const timePart = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }).replace(/:/g, '');
        const timestamp = `${datePart}_${timePart}`;
        const email = `_emailname${timestamp}@gmail.com`
        
        const logEntry = `[${now.toLocaleString('ru-RU')}] ${email}\n`;
        const filePath = path.resolve('src/utils/output/emails_history.txt');
        fs.appendFileSync(filePath, logEntry, 'utf8');

        return email
    }
