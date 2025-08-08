import { test, expect } from '@playwright/test';
import { autoLogin } from 'e2e/utils/login';

test('Permission + UI workflow test', async ({ browser }) => {
    // 1️⃣ Khởi tạo page đồng bộ cho cả quá trình test
    const context = await browser.newContext();
    const page = await context.newPage();

    await autoLogin(page);
    await page.getByText('Marketing').click();
    await page.getByTitle('Quà tặng').click();

    let permissions = [];

    await test.step('API: Gọi lấy permission', async () => {
        const res = await context.request.post('/api/conf/GetPermissionDLL', {
            data: { payload: 'mar021-discount-gift-list' }
        });
        console.log(res.status(), await res.text());
        expect(res.ok())

        const body = await res.json();
        expect(body.ActionPermission).toBeDefined();
    });

    await test.step('Validate ActionType permissions', async () => {
        const hasCreate = permissions.some(p => p.ActionType === 2);
        expect(hasCreate).toBeTruthy();
        expect(permissions).toContainEqual(
            expect.objectContaining({ ActionType: 2, ActionName: 'Quyền tạo' })
        );
    });

    await test.step('UI: Kiểm tra checkbox & nút TẠO MỚI', async () => {
        const hasCreate = permissions.some(p => p.ActionType === 2);

        const draft = page.getByRole('checkbox', { name: 'Đang soạn thảo' });
        await expect(draft).toBeVisible({ timeout: 10_000 });
        await expect(draft).toBeChecked();

        const createBtn = page.getByRole('button', { name: 'TẠO MỚI' });
        if (hasCreate) {
            await expect(createBtn).toBeVisible();
            // dropdown menu
            await createBtn.click();
            const items = [
                'Quà tặng theo sản phẩm',
                'Quà tặng theo nhóm sản phẩm',
                'Quà tặng theo hoá đơn'
            ];
            for (const text of items) {
                await expect(page.getByRole('menuitem', { name: text })).toBeVisible();
            }

            // kiểm tra style màu
            const bg = await createBtn.evaluate(el => getComputedStyle(el).backgroundColor);
            const fg = await createBtn.evaluate(el => getComputedStyle(el).color);
            expect(bg).toBe('rgb(26, 102, 52)');
            expect(fg).toBe('rgb(255, 255, 255)');
        } else {
            await expect(createBtn).toBeHidden();
        }
    });

    await context.close();
});
