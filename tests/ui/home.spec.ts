import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/ui/pages/homePage'
import { ProductDetailsPage } from '../../src/ui/pages/productDetailsPage'
import { HOME_PAGE_URL } from '../../test-data/urls'

test.describe("SMOKE TESTS", () => {

    let homePage: HomePage
    let productDetailsPage: ProductDetailsPage

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        productDetailsPage = new ProductDetailsPage(page)

        await homePage.open(HOME_PAGE_URL)
    })

    test('[TC-PO-SMOKE-001] | Check the loading of the product grid on the home page',
        { tag: ['@smoke', '@PO'] }, async () => {
            await expect(homePage.productGrid).toBeVisible()
            await expect(homePage.productGridContainer).toBeVisible()
        })

    test('[TC-PO-SMOKE-002] | Verify that clicking on a product card navigates to detail page',
        { tag: ['@smoke', '@PO'] }, async ({ page }) => {
            const firstProductCard = homePage.productCard.first();
            const firstProductURL = await homePage.getProductCardURL(firstProductCard);
            const productCardData = await homePage.getProductCardData(firstProductCard)

            await homePage.openProductDetails(firstProductCard);

            await expect(page).toHaveURL(firstProductURL as string)
            await expect(productDetailsPage.productTitle).toBeVisible()

            const productDetailsData = await productDetailsPage.getProductData();
            expect(productDetailsData).toEqual(productCardData)
        }
    )
})