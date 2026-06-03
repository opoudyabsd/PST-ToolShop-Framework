import { test, expect } from '@playwright/test';
import { HomePage } from '../../../src/ui/pages/homePage'
import { ProductDetailsPage } from '../../../src/ui/pages/productDetailsPage'
import { HOME_PAGE_URL } from '../../../test-data/API/urls'
import { SEARCH_QUERY } from '../../../test-data/UI/testData'
import { firstElementWaitForStable } from '../../../src/utils/commonMethods'

test.describe("SMOKE TESTS", () => {

    let homePage: HomePage
    let productDetailsPage: ProductDetailsPage

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        productDetailsPage = new ProductDetailsPage(page)

        await homePage.open(HOME_PAGE_URL)
    })

    test('[TC-PO-SMOKE-001] | Check the loading of the product grid on the home page',
        { tag: ['@smoke', '@PO', '@critical'] }, async () => {
            await expect(homePage.productGrid).toBeVisible()
            await expect(homePage.productGridContainer).toBeVisible()
        })

    test('[TC-PO-SMOKE-002] | Verify that clicking on a product card navigates to detail page',
        { tag: ['@smoke', '@PO', '@critical'] }, async ({ page }) => {

            const firstProductCard = homePage.productCard.first();
            const firstProductURL = await homePage.getProductCardURL(firstProductCard);
            const productCardData = await homePage.getProductCardData(firstProductCard)

            await homePage.openProductDetails(firstProductCard);

            await expect(page).toHaveURL(firstProductURL as string);
            await expect(productDetailsPage.productTitle).toBeVisible();
            await expect(productDetailsPage.productDesc).toBeVisible();

            const productDetailsData = await productDetailsPage.getProductData();
            expect(productDetailsData).toEqual(productCardData)
        }
    )

    test('[TC-PO-SMOKE-003] | Check the pagination controls are displayed and functional',
        { tag: ['@smoke', '@PO', '@critical'] }, async () => {
            const firstProductNamePage1 = await homePage.getProductCardName(homePage.productCard.first()) as string

            await expect(homePage.paginationSection).toBeVisible()
            await expect(homePage.currentPage).toHaveText('1')

            await homePage.nextPageBtn.click()

            await expect(homePage.currentPage).toHaveText('2')
            await expect(homePage.productCard.first()).not.toHaveText(firstProductNamePage1)
        }
    )

    test('[TC-PO-SMOKE-004] | Verify that search returns expected matching results',
        { tag: ['@smoke', '@PO', '@critical'] }, async () => {
            await homePage.searchForItem(SEARCH_QUERY.pliers)

            await expect(homePage.searchedForHeader).toBeVisible();
            await expect(homePage.searchTermFor).toHaveText(SEARCH_QUERY.pliers)

            await firstElementWaitForStable(homePage.productCard)

            const allProductCardNames = await homePage.getAllProductCardNamesPerPage();

            for (const names of allProductCardNames) {
                expect(names).toContain(SEARCH_QUERY.pliers)
            }
        }
    )
})