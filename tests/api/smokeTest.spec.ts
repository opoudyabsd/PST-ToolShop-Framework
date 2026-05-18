import { test } from "../../src/fixtures/apiFixture";

test("Test", async ({ API }) => {
  API
    .path('/products')
    .params({ is_rental: false, page: 5 })
    .getUrl()

})