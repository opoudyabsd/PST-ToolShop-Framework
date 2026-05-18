import { test } from "../../src/fixtures/apiFixture";
import { expect } from "@playwright/test";
import { RANDOM_USER_DATA } from "../../test-data/testData"
import { API_PATH } from "../../test-data/urls";

test.describe("User section: Smoke testing", () => {

  test("POST | Register new user with random data", { tag: ['@API', '@POST', '@user', '@smoke'] },
    async ({ API }) => {
      const response = await API
        .path(API_PATH.user.register)
        .body(RANDOM_USER_DATA)
        .postRequest(201)

      expect(response).toEqual(expect.objectContaining({
        first_name: RANDOM_USER_DATA.first_name,
        last_name: RANDOM_USER_DATA.last_name,
        phone: RANDOM_USER_DATA.phone,
        dob: RANDOM_USER_DATA.dob,
        email: RANDOM_USER_DATA.email,
        address: {
          street: RANDOM_USER_DATA.address.street,
          house_number: RANDOM_USER_DATA.address.house_number,
          city: RANDOM_USER_DATA.address.city,
          state: RANDOM_USER_DATA.address.state,
          country: RANDOM_USER_DATA.address.country,
          postal_code: RANDOM_USER_DATA.address.postal_code,
        }
      }))
    })

})

