import { faker } from '@faker-js/faker';


export const RANDOM_USER_DATA = {
    "first_name": faker.person.firstName(),
    "last_name": faker.person.lastName(),
    "address": {
        "street": faker.location.street(),
        "house_number": String(faker.number.int({ min: 1, max: 1000 })),
        "city": faker.location.city(),
        "state": faker.location.state(),
        "country": 'USA',
        "postal_code": faker.location.zipCode()
    },
    "phone": faker.phone.number({ style: "international" }),
    "dob": "1999-01-01",
    "password": "TEST_Password_123",
    "email": faker.internet.email()
};