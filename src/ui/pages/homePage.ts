import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from "../basePage";


export class HomePage extends BasePage {

    public readonly productGrid: Locator;
    public readonly productGridContainer: Locator;
    public readonly productCard: Locator;

    private productCardPrice: string;
    private productCardName: string;
    private productCardImage: string;

    constructor(page: Page) {
        super(page)

        this.productGrid = page.locator('div[class="col-md-9"]')
        this.productGridContainer = this.productGrid.locator('div[class="container"]')
        this.productCard = this.productGridContainer.locator('a[class="card"]')

        this.productCardPrice = "span[data-test='product-price']"
        this.productCardName = 'h5[data-test="product-name"]'
        this.productCardImage = 'img[class="card-img-top"]'
    }

    async openProductDetails(locator: Locator): Promise<void> {
        await locator.click();
    }

    async getProductCardURL(locator: Locator): Promise<string | null> {
        return locator.getAttribute('href') ?? null
    }

    async getProductCardPrice(locator: Locator): Promise<number> {
        const productPrice = await locator.locator(this.productCardPrice).textContent() as string
        return Number(productPrice.replace('$', ''))
    }

    async getProductCardName(locator: Locator): Promise<string | null> {
        return (await locator.locator(this.productCardName).textContent())?.trim() ?? null
    }

    async getProductCardImgPath(locator: Locator): Promise<string | null> {
        return locator.locator(this.productCardImage).getAttribute('src')
    }

    async getProductCardData(locator: Locator): Promise<object> {
        return {
            productName: await this.getProductCardName(locator),
            productPrice: await this.getProductCardPrice(locator),
            productImgPath: await this.getProductCardImgPath(locator)
        }
    }
}