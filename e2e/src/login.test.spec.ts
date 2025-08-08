import { test, expect } from '@playwright/test';

const testData = [
  {
    username: 'hachihachi',
    password: '123456789',
    expectedMessage: 'Đăng nhập thành công',
    expectedStatus: 400,
  },
  {
    username: 'user2',
    password: 'password2',
    expectedMessage: ' Đăng nhập thất bại ',
    expectedStatus: 200,
  },
  {
    username: 'invaliduser',
    password: 'wrongpass',
    expectedMessage: ' Đăng nhập thất bại ',
    expectedStatus: 400,
  },
];

test.describe('Login Tests', () => {
  test.beforeEach(async ({ page }) => {
    page.on('request', (request) => {
      if (request.method() === 'POST') {
        console.log('Request URL:', request.url());
        console.log('Request Body:', request.postData());
      }
    });

    page.on('response', (response) => {
      if (response.request().method() === 'POST') {
        console.log('Response URL:', response.url());
        console.log('Response Status:', response.status());
      }
    });

    await page.goto('/login');
  });

  for (const {
    username,
    password,
    expectedMessage,
    expectedStatus,
  } of testData) {
    test(`Login with ${username}`, async ({ page }) => {
      await page
        .getByRole('textbox', { name: 'Nhập tài khoản' })
        .fill(username);
      await page.getByRole('textbox', { name: 'Nhập mật khẩu' }).fill(password);

      // Chờ nút "Đăng nhập" enabled trước khi click
      await page.waitForFunction(
        () => {
          const button = document.querySelector('button#loginBtn');
          return button && !button.ariaDisabled;
        },
        {},
        { timeout: 10000 }
      );

      // Bắt request API đăng nhập
      const [response] = await Promise.all([
        page.waitForResponse(
          (response) =>
            response.url().includes('/connect/token') &&
            response.request().method() === 'POST',
          { timeout: 15000 }
        ),
        page.getByRole('button', { name: 'Đăng nhập' }).click(),
      ]);

      // Kiểm tra API response
      expect(response.status()).toBe(expectedStatus);

      // Kiểm tra response body
      const responseBody = await response.json();
      console.log('API Response Body:', responseBody);
      if (expectedStatus === 200) {
        expect(responseBody).toHaveProperty('access_token');
        expect(responseBody.token_type).toBe('Bearer');
      } else {
        expect(responseBody).toHaveProperty('error');
        expect(responseBody.error).toBe('invalid_grant');
      }

      // Kiểm tra giao diện (UI)
      await page.waitForSelector('[role="alert"]', { timeout: 10000 });
      const alert = page.getByRole('alert', { name: 'Notification' }).first(); // Chọn alert đầu tiên
      await expect(alert).toHaveText(expectedMessage.trim()); // Loại bỏ khoảng trắng thừa

      // (Tùy chọn) Nhấn đóng thông báo
      await alert.click();
    });
  }
});
