import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from "../basePage";


export class ProductDetailsPage extends BasePage {

    public readonly productTitle: Locator;
    public readonly productPrice: Locator;
    public readonly productDesc: Locator;
    public readonly productImage: Locator;
    public readonly productCategory: Locator;
    public readonly productBrand: Locator;

    constructor(page: Page) {
        super(page)

        this.productTitle = page.locator('h1[data-test="product-name"]');
        this.productPrice = page.locator('span[data-test="unit-price"]')
        this.productDesc = page.locator('#description')
        this.productImage = page.locator('img[class="figure-img img-fluid"]')
        this.productCategory = page.locator('span[aria-label="category"]')
        this.productBrand = page.locator('span[aria-label="brand"]')
    }

    async getProductTitle(): Promise<string | null> {
        return (await this.productTitle.textContent())?.trim() ?? null
    }

    async getProductPrice(): Promise<number | null> {
        return Number(await this.productPrice.textContent())
    }

    async getProductImgPath(): Promise<string | null> {
        return this.productImage.getAttribute('src')
    }

    async getProductData(): Promise<object> {
        return {
            productName: await this.getProductTitle(),
            productPrice: await this.getProductPrice(),
            productImgPath: await this.getProductImgPath()
        }
    }

}