// e2e/utils/login.ts
import { Page, expect } from '@playwright/test';

export async function autoLogin(page: Page) {
  await page.goto('http://localhost:4200/login');
  await page
    .getByRole('textbox', { name: 'Nhập tài khoản' })
    .fill('hachihachi');
  await page.getByRole('textbox', { name: 'Nhập mật khẩu' }).fill('123456789');
  await page.getByRole('button', { name: 'Đăng nhập' }).click();

  await page.waitForURL(
    'http://localhost:4200/#/ecommerce/ecom013-dashboard/1',
    { timeout: 10000 }
  );
  await expect(page).toHaveURL(/ecom013-dashboard/);
}
