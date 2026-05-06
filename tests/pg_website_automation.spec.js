import { test, expect } from '@playwright/test';
import { userData } from '../utils/testData';


async function loginAndNavigate(page) {
  await page.goto('http://localhost:3000/');

  const loginData = userData.auth.login;

  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Enter your email' }).fill(loginData.email);
  await page.getByRole('textbox', { name: 'Enter your password' }).fill(loginData.password);
  await page.getByRole('button', { name: 'Login' }).click();

  await page.getByRole('heading', { name: 'Feedback & Queries' }).click();
}


async function fillForm(page, data) {
  if (data.name)
    await page.getByRole('textbox', { name: 'Name' }).fill(data.name);

  if (data.roomNo)
    await page.getByRole('textbox', { name: 'Room No.' }).fill(data.roomNo);

  if (data.type === 'Feedback') {
    await page.getByLabel('Feedback').check();
  } else if (data.type === 'Queries') {
    await page.getByLabel('Support & Queries').check();
  }

  if (data.message)
    await page.getByRole('textbox', { name: 'Message' }).fill(data.message);
}


test.describe('@smoke Feedback Module', () => {

  test.beforeEach(async ({ page }) => {
    await loginAndNavigate(page);
  });

  test('TC01 - Submit positive feedback', async ({ page }) => {
    await fillForm(page, userData.feedbackPositive);

    page.once('dialog', dialog => dialog.accept());

    await page.getByRole('button', { name: 'Submit' }).click();
  });

  test('TC02 - Submit negative feedback', async ({ page }) => {
    await fillForm(page, userData.feedbackNegative);
    await page.getByRole('button', { name: 'Submit' }).click();
  });

  test('TC03 - Submit support query', async ({ page }) => {
    await fillForm(page, userData.queryRoomChange);
    await page.getByRole('button', { name: 'Submit' }).click();
  });
});


test.describe('@regression Validation Tests', () => {

  test.beforeEach(async ({ page }) => {
    await loginAndNavigate(page);
  });

  test('TC04 - Validate required fields', async ({ page }) => {
    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page.locator('.error')).toContainText([
      'Name is required',
      'Room number is required',
      'Message is required',
      'Please select one option'
    ]);
  });

  test('TC05 - Validate missing type selection', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Name' }).fill('Test');
    await page.getByRole('textbox', { name: 'Room No.' }).fill('101');
    await page.getByRole('textbox', { name: 'Message' }).fill('Test message');

    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page.locator('.error')).toContainText('Please select one option');
  });

  test('TC06 - Validate empty name field', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Room No.' }).fill('101');
    await page.getByLabel('Feedback').check();
    await page.getByRole('textbox', { name: 'Message' }).fill('Test');

    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page.locator('.error')).toContainText('Name is required');
  });

  test('TC07 - Validate empty message field', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Name' }).fill('Test');
    await page.getByRole('textbox', { name: 'Room No.' }).fill('101');
    await page.getByLabel('Feedback').check();

    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page.locator('.error')).toContainText('Message is required');
  });
});


test.describe('@smoke Public Pages', () => {

  test('TC08 - Booking Form', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    await page.getByRole('button', { name: 'Book Your Visit Today' }).click();

    await page.getByRole('textbox', { name: 'Your Name' }).fill(userData.booking.name);
    await page.getByRole('textbox', { name: 'Your Email' }).fill(userData.booking.email);
    await page.getByRole('textbox', { name: 'Your Phone' }).fill(userData.booking.phone);
    await page.locator('input[name="date"]').fill(userData.booking.date);

    page.once('dialog', dialog => dialog.dismiss());

    await page.getByRole('button', { name: 'Submit' }).click();
  });

  test('TC09 - Contact Form', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    await page.getByRole('link', { name: 'Contact' }).click();

    await page.locator('input[name="full_name"]').fill(userData.contact.name);
    await page.locator('input[name="email"]').fill(userData.contact.email);
    await page.locator('input[name="address"]').fill(userData.contact.address);
    await page.locator('input[name="phone"]').fill(userData.contact.phone);
    await page.locator('input[name="date"]').fill(userData.contact.date);

    page.once('dialog', dialog => dialog.dismiss());

    await page.getByRole('button', { name: 'Submit Inquiry' }).click();
  });
});


test.describe('@regression Authentication', () => {

  test('TC10 - Forgot Password', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByText('Forgot Password?').click();

    await page.getByRole('textbox', { name: 'Enter your email' })
      .fill(userData.auth.forgot.email);

    page.once('dialog', dialog => dialog.dismiss());

    await page.getByRole('button', { name: 'Send OTP' }).click();
  });

  test('TC11 - Register User', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByText("Don't have an account? Sign up").click();

    await page.getByRole('textbox', { name: 'Enter username' })
      .fill(userData.auth.register.username + Date.now());

    await page.getByRole('textbox', { name: 'Enter your email' })
      .fill(`test${Date.now()}@gmail.com`);

    await page.getByRole('textbox', { name: 'Enter your password' })
      .fill(userData.auth.register.password);

    await page.getByRole('button', { name: 'Register' }).click();
  });

});