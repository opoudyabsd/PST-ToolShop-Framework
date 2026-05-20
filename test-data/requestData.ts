import { faker } from '@faker-js/faker';

export const ADMIN_ACCOUNT = {
    email: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD
}

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

export const BEARER_REGEXP_MATCH = /^[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+=*$/

export const ACCOUNT_VALIDATION_MATCH = {
    id: /^[A-Za-z0-9]+$/,
    first_name: /^[A-Za-z]+([-' ][A-Za-z]+)*$/,
    last_name: /^[A-Za-z]+([-' ][A-Za-z]+)*$/,
    email: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
    role: /^(user|admin)$/
};