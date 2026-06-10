import { test, expect } from '@playwright/test';
import { HomePage } from '../../../src/ui/pages/homePage'
import { HOME_PAGE_URL } from '../../../test-data/API/urls'

test.describe("REGRESSION TESTS", () => {

    let homePage: HomePage

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);

        await homePage.open(HOME_PAGE_URL)
    })

    test('[TC-PO-REG-003] | Product card click URL contains product ID',
        { tag: ['@regression', '@PO', '@medium'] }, async ({ page }) => {
            const firstProductCard = homePage.productCard.first()
            const productID = await homePage.getProductID(firstProductCard)

            await homePage.openProductDetails(firstProductCard)

            await expect(page).toHaveURL(new RegExp(`/product/${productID}$`))
        })

})