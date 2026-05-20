import { test } from "../../src/fixtures/apiFixture";
import { expect } from "../../src/utils/customAssertion";
import { RANDOM_USER_DATA, ADMIN_ACCOUNT, BEARER_REGEXP_MATCH, ACCOUNT_VALIDATION_MATCH } from "../../test-data/requestData"
import { API_PATH } from "../../test-data/urls";

test.describe("User section: Smoke testing", () => {

  test("GET | Retrieve all users", { tag: ['@API', '@GET', '@user', '@smoke'] },
    async ({ API, adminToken }) => {
      const response = await API
        .path("/users")
        .headers({ Authorization: `Bearer ${adminToken}` })
        .getRequest(200)

      const accountData = response["data"]

      for (const account of accountData) {
        expect(account.id).toMatch(ACCOUNT_VALIDATION_MATCH.id)
        expect(account.first_name).toMatch(ACCOUNT_VALIDATION_MATCH.first_name)
        expect(account.last_name).toMatch(ACCOUNT_VALIDATION_MATCH.last_name)
        expect(account.email).toMatch(ACCOUNT_VALIDATION_MATCH.email)
        expect(account.role).toMatch(ACCOUNT_VALIDATION_MATCH.role)
      }
    })

  test("POST | Register new user with random data", { tag: ['@API', '@POST', '@user', '@smoke'] },
    async ({ API }) => {
      const response = await API
        .path(API_PATH.user.register)
        .body(RANDOM_USER_DATA)
        .postRequest(201)

      expect(response).toMatchPartialObject({
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
      })
    })

  test('POST | Login to admin account', { tag: ['@API', '@GET', '@user', '@smoke'] },
    async ({ API }) => {
      const response = await API
        .path(API_PATH.user.login)
        .body(ADMIN_ACCOUNT)
        .postRequest(200)

      expect(response["access_token"]).toMatch(BEARER_REGEXP_MATCH)
      expect(response).toMatchPartialObject({
        token_type: "bearer",
        expires_in: 300
      })
    }
  )
})
