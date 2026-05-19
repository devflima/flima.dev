# flima.dev — React SPA Client

Modern, responsive, and highly animated frontend web application built with **React 19** and **Vite**, featuring a cyber-terminal theme tailored for a Systems Architect.

---

## 🛠️ Tech Stack & Key Libraries

- **Build Tool / Bundler**: Vite
- **UI Framework**: React 19
- **State Management & Caching**: Redux Toolkit (RTK Query)
- **Routing**: React Router DOM v7
- **Styling**: Vanilla CSS (Structured with root design tokens)
- **Mocking**: Mock Service Worker (MSW)
- **Testing**: Vitest & React Testing Library (RTL)

---

## 📦 State Management & Data Fetching (RTK Query)

The frontend uses **RTK Query** (`@reduxjs/toolkit/query/react`) for all network requests.
* **Auto-Caching & Revalidation**: Endpoints automatically cache fetched data. When mutation actions occur (e.g. updating a project in the Admin dashboard), the corresponding tag is invalidated, triggering a silent background re-fetch.
* **Authorization Headers**: The api client slice dynamically injects the JWT token stored in Redux/localStorage for any request targeting `/api/v1/admin/*`.

---

## 🛡️ LGPD / GDPR Compliance Workflow

The application implements a strict consent model:
1. Upon first load, a Cookie Consent Banner is displayed.
2. If accepted, `lgpd_cookie_consent=true` is stored in `localStorage` and page views trigger telemetry tracking.
3. A unique, random `visitor_id` is generated and sent via custom headers (`X-Visitor-Id`) to track anonymous daily visitors without harvesting personal data.
4. If denied or unaccepted, no tracking headers or telemetry cookies are generated.

---

## 🧪 Testing and Code Quality

We enforce high standards of code coverage and linting compliance.

### Running Vitest Suites
Run the entire Vitest suite:
```bash
npm run test
```
To run tests in watch mode:
```bash
npm run test:watch
```

### ESLint Linting
Verify code complies with eslint rules:
```bash
npm run lint
```
*Note: Clean compilation and zero linting warnings are required to satisfy the CI/CD pull request validation pipelines.*

### SonarQube Quality Gate Checklist
Before merging changes, verify:
* **Coverage**: Overall test coverage is above **80%** on new code.
* **Reliability**: Code contains no synchronous cascading state updates inside React `useEffect` hooks.
