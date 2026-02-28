import { test, expect } from '@playwright/test';


test.describe('Adding new car with api', () => {
    
    test('Adding a new car', async ({ request }) => {
        const response = await request.post('/api/cars', {
            data: {
                "carBrandId": 1,
                "carModelId": 1,
                "mileage": 123
                }
        })
        
        expect(response.ok()).toBeTruthy()
        expect(response.status()).toBe(201)


        const body = await response.json()
        expect(body).toMatchObject({
            "status": "ok",
            "data": {
                "carBrandId": 1,
                "carModelId": 1,
                "mileage": 123
            }
        })

    })

    test('Adding car with negative mileage', async ({ request }) => {
        const response = await request.post('/api/cars', {
            data: {
                "carBrandId": 1,
                "carModelId": 1,
                "mileage": -120
                }
        })
        
        expect(response.status()).toBe(400)
    })

    test('Adding car with no data', async ({ request }) => {
        const response = await request.post('/api/cars', {
            data: {}
        })
        
        expect(response.status()).toBe(400)
        const body = await response.json()
        expect(body.status).toBe('error')
    })

})