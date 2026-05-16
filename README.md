# PST-ToolShop-Framework

Greetings to everyone reading this. I'd like to introduce my new automated framework, created for a [website](https://practicesoftwaretesting.com/). I decided to create it for myself so I could practice in my free time. I also created a small documentation with test cases, a test plan, bugs, and other text junk in [Notion](https://www.notion.so/PST-ToolShop-Framework-35e8e3a4973280259522ce36fad6c81e?source=copy_link). As you can see, the framework was built on Playwright and TypeScript. I also used Claude for creating test cases, there only one agent specifically for this task, and I used MCP of Playwright and Notion for it. This "agent" and Claude in general, was used only for creating test cases and updating README.md file (this initial text was written by me, not by AI), since creating test cases isn't really interesting and fun task. The test script themself I wrote by myself  and the remaining documentation from Notion as well or pulled it from open sources, which will be included at the end of each document page in Notion. The test website itself includes a lot of different documentation, which can be found [here](https://testsmith-io.github.io/practice-software-testing/#/). I simply filtered some of it and then pasted it into Notion. The framework itself will be updated with new tests and various new methods as I practice and learn. I'll try to use something new, so if anyone reads this or looking into framework and find any errors or find a flawed execution of an action or the bad design or invalid implementation of a pattern or mechanism, please don't be angry. That's all for now, I think this file will be updated during the testing process. Below, you'll see the generated garbage from the LLM Model in case if you need it :)

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| Playwright | Browser automation & API testing |
| TypeScript | Type-safe test authoring |
| [Notion](https://www.notion.so/PST-ToolShop-Framework-35e8e3a4973280259522ce36fad6c81e?source=copy_link) | Documentation |
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
