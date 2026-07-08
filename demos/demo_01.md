### The Browser → Context → Page Hierarchy

┌─────────────────────────────────────────────┐
│ Browser (Chrome)                            │
│                                             │
│  ┌────────────────────────────────────┐     │
│  │ Context 1 (Test 1's isolated env)  │     │
│  │  ┌──────────┐  ┌──────────┐        │     │
│  │  │ Page 1   │  │ Page 2   │        │     │
│  │  │ Login    │  │ Dashboard│        │     │
│  │  └──────────┘  └──────────┘        │     │
│  └────────────────────────────────────┘     │
│                                             │
│  ┌────────────────────────────────────┐     │
│  │ Context 2 (Test 2's isolated env)  │     │
│  │  ┌──────────┐                      │     │
│  │  │ Page 1   │                      │     │
│  │  │ Checkout │                      │     │
│  │  └──────────┘                      │     │
│  └────────────────────────────────────┘     │
└─────────────────────────────────────────────┘


#### Browser Contexts - Test Isolation

MANUAL TESTING:
┌─────────────────────────────────┐
│  Regular Browser Window         │
│  ├── Cookies: sessionID=admin   │
│  ├── LocalStorage: {user:admin} │
│  └── Cache: logo.png, style.css │
└─────────────────────────────────┘
       ↓ (Open Incognito)
┌─────────────────────────────────┐
│  Incognito Window (Clean Slate) │
│  ├── Cookies: (empty)           │
│  ├── LocalStorage: (empty)      │
│  └── Cache: (empty)             │
└─────────────────────────────────┘

PLAYWRIGHT:
┌────────────────────────────────────────────┐
│  ONE Browser Process (Chromium)            │
│                                            │
│  ┌─────────────────┐  ┌─────────────────┐  │
│  │ Context 1       │  │ Context 2       │  │
│  │ (Test 1)        │  │ (Test 2)        │  │
│  │ Cookies: {...}  │  │ Cookies: {...}  │  │
│  │ Storage: {...}  │  │ Storage: {...}  │  │
│  └─────────────────┘  └─────────────────┘  │
│                                            │
│  ┌─────────────────┐                       │
│  │ Context 3       │  (All isolated!)      │
│  │ (Test 3)        │                       │
│  │ Cookies: {...}  │                       │
│  │ Storage: {...}  │                       │
│  └─────────────────┘                       │
└────────────────────────────────────────────┘


#### Playwright vs Selenium 

SELENIUM (Old way):
Your Test → WebDriver Server → Browser Driver → Browser
            (extra step)        (extra step)

PLAYWRIGHT (Modern way):
Your Test → Browser
            (direct connection via DevTools)


