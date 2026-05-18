import { test } from "../../src/fixtures/apiFixture";
import { expect } from "@playwright/test";

test("Test", async ({ API }) => {
  const response = await API
    .path('/products')
    .params({ is_rental: true })
    .getRequest(200)

})