import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from "../basePage";


export class HomePage extends BasePage {

    public readonly productGrid: Locator;
    public readonly productGridContainer: Locator;
    public readonly productCard: Locator;
    public readonly paginationSection: Locator;
    public readonly previousPageBtn: Locator;
    public readonly nextPageBtn: Locator;
    public readonly currentPage: Locator;
    public readonly searchField: Locator;
    public readonly searchSubmitBtn: Locator;
    public readonly searchedForHeader: Locator;
    public readonly searchTermFor: Locator;

    private productCardPrice: string;
    private productCardName: string;
    private productCardImage: string;
    private filterSection: Locator;

    constructor(page: Page) {
        super(page)

        this.productCardPrice = "span[data-test='product-price']"
        this.productCardName = 'h5[data-test="product-name"]'
        this.productCardImage = 'img[class="card-img-top"]'

        this.filterSection = page.locator('#filters')

        this.productGrid = page.locator('div[class="col-md-9"]')
        this.productGridContainer = this.productGrid.locator('div[class="container"]')
        this.productCard = this.productGridContainer.locator('a[class="card"]')
        this.paginationSection = page.locator('ul[class*="pagination"]')
        this.previousPageBtn = this.paginationSection.locator('a[aria-label="Previous"]')
        this.nextPageBtn = this.paginationSection.locator('a[aria-label="Next"]')
        this.currentPage = this.paginationSection.locator('li[class="page-item active"]')
        this.searchField = this.filterSection.locator('#search-query')
        this.searchSubmitBtn = this.filterSection.locator('button[data-test="search-submit"]')
        this.searchedForHeader = page.locator('h3[data-test="search-caption"]')
        this.searchTermFor = this.searchedForHeader.locator('span[data-test="search-term"]')
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

    async searchForItem(productName: string): Promise<void> {
        await this.searchField.fill(productName)
        await this.searchSubmitBtn.click()
    }

    async getAllProductCardNamesPerPage(): Promise<string[]> {
        await this.productCard.first().waitFor({ state: 'visible' })

        const allProductCardNames = await this.page.locator(this.productCardName).all()
        const productCardNames = []
        for (let productCardName of allProductCardNames) {
            const extractedName = await productCardName.textContent() as string
            productCardNames.push(extractedName.toLowerCase().trim())
        }

        return productCardNames
    }
}