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
│     PAGE OBJECTS  │  REQUEST HANDLER    │  src/ui/pages/ │ src/api/
├─────────────────────────────────────────┤
│              UTILS LAYER                │  src/utils/
├─────────────────────────────────────────┤
│             DATA LAYER                  │  test-data/
├─────────────────────────────────────────┤
│         CONFIGURATION LAYER             │  config/
└─────────────────────────────────────────┘
```

| Layer | Location | Responsibility |
|-------|----------|----------------|
| **Configuration** | `config/` | Environment variables and base URLs |
| **Data** | `test-data/` | Dynamic data builders using Faker.js |
| **Request Handler** | `src/api/` | Fluent HTTP client — path, headers, body, method chaining |
| **Page Object** | `src/ui/pages/` | Page-level actions and assertions (POM pattern) |
| **Utils** | `src/utils/` | Custom assertions, logger, shared helpers |
| **Fixture** | `src/fixtures/` | Playwright `test.extend()` — injects API and UI objects into tests |
| **Test** | `tests/` | Business-scenario specs split by `api/` and `ui/` |

---

## Folder Structure

```ini
PracticeSoftwareTesting/
├── config/
│   └── .env.example                # Environment variables example
├── src/
│   ├── api/
│   │   └── requestHandler.ts       # Fluent HTTP request builder
│   ├── fixtures/
│   │   └── apiFixture.ts           # API Fixtures
│   ├── ui/
│   │   ├── basePage.ts             # Base page class
│   │   └── pages/                  # Page Object Model classes
│   └── utils/
│       ├── customAssertion.ts      # Custom assertions
│       ├── logger.ts               # API request/response logger
│       └── commonMethods.ts        # Shared helper methods
├── test-data/
│   └── testData.ts                 # Testing data
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
```

---

## Available Commands

```bash
# Run all tests
npm test

# Run UI tests only (chromium)
npm run test:ui

# Run API tests only
npm run test:api

# Run tests tagged @smoke
npm run test:smoke

# Run tests tagged @regression
npm run test:regression

# Run tests tagged @E2E
npm run test:E2E

# Open HTML report
npm run report
```
