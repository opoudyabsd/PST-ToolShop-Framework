# PST-ToolShop-Framework

A Playwright + TypeScript test automation framework for [practicesoftwaretesting.com](https://practicesoftwaretesting.com/), structured around the **TAF Layers architecture** to support API testing and UI testing (E2E, regression, smoke).

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| [Playwright](https://playwright.dev/) | Browser automation & API testing |
| TypeScript | Type-safe test authoring |
| dotenv | Environment variable management |
| GitHub Actions | CI/CD pipeline |

---

## Architecture

The framework is organized into discrete layers. Each layer has one responsibility; upper layers depend on lower ones — tests never reach past the fixture layer.

```ini
┌─────────────────────────────────────────┐
│             TEST LAYER                  │  tests/
├─────────────────────────────────────────┤
│            FIXTURE LAYER                │  src/fixtures/
├─────────────────────────────────────────┤
│   PAGE OBJECTS  │  API SERVICES         │  src/ui/pages/ │ src/api/
├─────────────────────────────────────────┤
│   UI COMPONENTS │  API CLIENTS          │  src/ui/components/ │ src/api/
├─────────────────────────────────────────┤
│             DATA LAYER                  │  test-data/
├─────────────────────────────────────────┤
│         CONFIGURATION LAYER             │  config/
└─────────────────────────────────────────┘
```

| Layer | Location | Responsibility |
|-------|----------|----------------|
| **Configuration** | `config/` | Environment variables, base URLs, credentials |
| **Data** | `test-data/` | Static test fixtures and dynamic data builders |
| **API Client** | `src/api/` | Low-level HTTP transport — sets headers, auth, base URL |
| **UI Component** | `src/ui/components/` | Atomic reusable UI wrappers (navbar, toast, modal) |
| **Page Object** | `src/ui/pages/` | Page-level actions and assertions (POM pattern) |
| **Fixture** | `src/fixtures/` | Playwright `test.extend()` — injects pages & services into tests |
| **Test** | `tests/` | Business-scenario specs; use only fixtures, never `new` directly |

---

## Folder Structure

```ini
PracticeSoftwareTesting/
├── config/
│   └── .env                        # Environment variables (gitignored)
├── src/
│   ├── api/                        # API clients and service classes
│   ├── fixtures/                   # Custom Playwright fixture definitions
│   └── ui/
│       ├── components/             # Reusable UI component objects
│       └── pages/                  # Page Object Model classes
├── test-data/                      # Static JSON/CSV seed data and builders
├── tests/
│   ├── api/                        # API test specs
│   └── ui/                         # UI test specs
│       ├── e2e/                    # End-to-end user journey flows
│       ├── regression/             # Feature-level regression tests
│       └── smoke/                  # Critical-path smoke checks
├── playwright.config.ts
├── tsconfig.json
└── package.json
```

---

## Getting Started

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Run all tests
npx playwright test

# Run only smoke tests
npx playwright test --grep @smoke

# Run only API tests
npx playwright test tests/api/

# Run only UI tests
npx playwright test tests/ui/

# Open the HTML report
npx playwright show-report
```

---

## Environment Setup

Copy and configure the environment file before running tests:

```bash
cp config/.env.example config/.env
```

| Variable | Description |
|----------|-------------|
| `BASE_URL` | Target application URL |
| `USER_EMAIL` | Test user email |
| `USER_PASSWORD` | Test user password |

---

## CI/CD

GitHub Actions runs the full test suite on every push and pull request to `main`, then uploads the HTML report as a build artifact (retained 30 days). See [`.github/workflows/playwright.yml`](.github/workflows/playwright.yml).
