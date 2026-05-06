# pg-website-playwright-ui-automation
This project demonstrates end-to-end UI test automation using Playwright for a PG (Paying Guest) web application.

---

## Tech Stack
- Playwright
- JavaScript
- Node.js
- Formik + Yup (Frontend validation testing)
- Cross-browser testing (Chromium, Firefox, WebKit)

## Test Modules Covered

### Feedback & Support Module
- Submit positive feedback
- Submit negative feedback
- Submit support queries

### Validation Testing
- Required field validation
- Missing radio button selection
- Empty input validation

### Public Pages
- Booking form submission
- Contact form submission

### Authentication
- Login flow
- Forgot password
- User registration

---

##  Test Tags
- `@smoke` → Critical flows
- `@regression` → Full validation suite

---

## How to Run Tests

```bash
npm install
npx playwright install
npx playwright test

## Run Specific Tags
npx playwright test --grep @smoke
npx playwright test --grep @regression

## HTML Report
npx playwright show-report

## Run Tests in Specific Browsers
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

## Run Tests in Headed Mode (UI Visible)
npx playwright test --headed


##  Test Execution Report (All Tests Passed ✅)
Playwright HTML report showcasing cross-browser testing (Chromium, Firefox, and WebKit) with a 100% pass rate and zero flaky tests.

<img width="1836" height="939" alt="Image" src="https://github.com/user-attachments/assets/4e44259d-8488-4de8-8e76-9b0998e3a9d8" />

