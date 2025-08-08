import { test, expect } from '@playwright/test';
import { autoLogin } from 'e2e/utils/login';

test('Kiểm tra bộ lọc gửi đúng payload', async ({ page }) => {
  await autoLogin(page);
  await page.goto('/#/ecommerce/ecom013-dashboard/1');

  await page.getByText('Nhân sự').click();
  await page.getByTitle('Chính sách', { exact: true }).click();

  const waitForFilterRequest = async (action: () => Promise<void>) => {
    const requests: any[] = [];
    page.on('request', (req) => {
      if (
        req.url().includes('/api/webadmin/GetListCMSNews') &&
        req.method() === 'POST'
      ) {
        try {
          const data = JSON.parse(req.postData() || '{}');
          if (data.filter) {
            requests.push(data);
          }
        } catch (_) {}
      }
    });

    await action();
    await page.waitForTimeout(1000); // Đợi request được gửi sau action

    const lastRequest = requests[requests.length - 1];
    console.log('📦 Payload:', lastRequest);
    return lastRequest;
  };

  // Truy cập trang -> click 'Bài viết chính sách' để load lần đầu
  const initial = await waitForFilterRequest(() =>
    page.getByTitle('Bài viết chính sách').click()
  );
  expect(initial).toEqual({
    pageSize: 25,
    sort: 'Code-desc',
    page: 1,
    filter:
      '((StatusID~eq~0~or~StatusID~eq~4~or~StatusID~eq~1)~and~TypeData~eq~7)',
  });

  // Click "Đã duyệt" (StatusID = 2)
  const approved = await waitForFilterRequest(() =>
    page.getByRole('button', { name: 'Đã duyệt' }).click()
  );
  expect(approved.filter).toBe(
    '((StatusID~eq~0~or~StatusID~eq~4~or~StatusID~eq~1~or~StatusID~eq~2)~and~TypeData~eq~7)'
  );

  // Click "Ngưng hiển thị" (StatusID = 3)
  const hidden = await waitForFilterRequest(() =>
    page.getByRole('button', { name: 'Ngưng hiển thị' }).click()
  );
  expect(hidden.filter).toBe(
    '((StatusID~eq~0~or~StatusID~eq~4~or~StatusID~eq~1~or~StatusID~eq~2~or~StatusID~eq~3)~and~TypeData~eq~7)'
  );

  // // Click "Reset bộ lọc"
  // const reset = await waitForFilterRequest(() =>
  //   page.getByRole('button', { name: 'Reset bộ lọc' }).click()
  // );
  // expect(reset.filter).toBe(
  //   '((StatusID~eq~0~or~StatusID~eq~4~or~StatusID~eq~1)~and~TypeData~eq~7)'
  // );

  // Chọn "Chính sách Nhân sự"
  // const categoryFilter = await waitForFilterRequest(async () => {
  //   await page.locator('kendo-multiselect').click();
  //   await page
  //     .getByRole('listbox')
  //     .getByText('Chính sách Nhân sự', { exact: true })
  //     .click();
  // });
  // expect(categoryFilter.filter).toBe(
  //   '((StatusID~eq~0~or~StatusID~eq~4~or~StatusID~eq~1)~and~NewsCategory~eq~1036~and~TypeData~eq~7)'
  // );

  //  Click "Page 2"
  const page2 = await waitForFilterRequest(() =>
    page.getByRole('button', { name: 'Page 2' }).click()
  );
  expect(page2).toEqual({
    pageSize: 25,
    sort: 'Code-desc',
    page: 2,
    filter:
      '((StatusID~eq~0~or~StatusID~eq~4~or~StatusID~eq~1~or~StatusID~eq~2~or~StatusID~eq~3)~and~TypeData~eq~7)',
  });

  // Click "Page 3"
  const page3 = await waitForFilterRequest(() =>
    page.getByRole('button', { name: 'Page 3' }).click()
  );
  expect(page3).toEqual({
    pageSize: 25,
    sort: 'Code-desc',
    page: 3,
    filter:
      '((StatusID~eq~0~or~StatusID~eq~4~or~StatusID~eq~1~or~StatusID~eq~2~or~StatusID~eq~3)~and~TypeData~eq~7)',
  });

  // Click "Page 4"
  const page4 = await waitForFilterRequest(() =>
    page.getByRole('button', { name: 'Page 4' }).click()
  );
  expect(page4).toEqual({
    pageSize: 25,
    sort: 'Code-desc',
    page: 4,
    filter:
      '((StatusID~eq~0~or~StatusID~eq~4~or~StatusID~eq~1~or~StatusID~eq~2~or~StatusID~eq~3)~and~TypeData~eq~7)',
  });

  // Click "Go to the first page"
  const firstPage = await waitForFilterRequest(() =>
    page.getByRole('button', { name: 'Go to the first page' }).click()
  );
  expect(firstPage).toEqual({
    pageSize: 25,
    sort: 'Code-desc',
    page: 1,
    filter:
      '((StatusID~eq~0~or~StatusID~eq~4~or~StatusID~eq~1~or~StatusID~eq~2~or~StatusID~eq~3)~and~TypeData~eq~7)',
  });

  // Click "Ngưng hiển thị" (StatusID = 3) lần 2
  const hiddenAgain = await waitForFilterRequest(() =>
    page.getByRole('button', { name: 'Ngưng hiển thị' }).click()
  );
  expect(hiddenAgain.filter).toBe(
    '((StatusID~eq~0~or~StatusID~eq~4~or~StatusID~eq~1~or~StatusID~eq~2)~and~TypeData~eq~7)'
  );

  // Click "Đã duyệt" (StatusID = 2) lần 2
  const approvedAgain = await waitForFilterRequest(() =>
    page.getByRole('button', { name: 'Đã duyệt' }).click()
  );
  expect(approvedAgain.filter).toBe(
    '((StatusID~eq~0~or~StatusID~eq~4~or~StatusID~eq~1)~and~TypeData~eq~7)'
  );

  // Click "Gửi duyệt" (StatusID = 1)
  const submitted = await waitForFilterRequest(() =>
    page.getByRole('button', { name: 'Gửi duyệt' }).click()
  );
  expect(submitted.filter).toBe(
    '((StatusID~eq~0~or~StatusID~eq~4)~and~TypeData~eq~7)'
  );

  //  Click "Đang soạn thảo" (StatusID = 0)
  const drafting = await waitForFilterRequest(() =>
    page.getByRole('button', { name: 'Đang soạn thảo' }).click()
  );
  expect(drafting.filter).toBe('TypeData~eq~7');

  // Nhập tìm kiếm "dsad"
  const search = await waitForFilterRequest(async () => {
    await page
      .getByRole('textbox', { name: 'Tìm theo tên bài viết chính s' })
      .click();
    await page
      .getByRole('textbox', { name: 'Tìm theo tên bài viết chính s' })
      .fill('dsad');
    await page.getByRole('button', { name: 'TÌM', exact: true }).click();
  });
  expect(search).toEqual({
    pageSize: 25,
    sort: 'Code-desc',
    filter: "(MetaTitle~contains~'dsad'~and~TypeData~eq~7)",
    page: 1,
  });

  // Click "Reset bộ lọc"
  const resetAgain = await waitForFilterRequest(() =>
    page.getByRole('button', { name: 'Reset bộ lọc' }).click()
  );
  expect(resetAgain.filter).toBe(
    '((StatusID~eq~0~or~StatusID~eq~4~or~StatusID~eq~1)~and~TypeData~eq~7)'
  );

  // Click breadcrumb "Bài viết chính sách"
  const breadcrumb = await waitForFilterRequest(() =>
    page.getByLabel('Breadcrumb').getByText('Bài viết chính sách').click()
  );
  expect(breadcrumb).toEqual({
    pageSize: 25,
    sort: 'Code-desc',
    page: 1,
    filter:
      '((StatusID~eq~0~or~StatusID~eq~4~or~StatusID~eq~1)~and~TypeData~eq~7)',
  });

  // Nhấn nút "THÊM MỚI"
  await page.getByRole('button', { name: 'THÊM MỚI' }).click();

  // Nhập tiêu đề bài viết (textbox đầu tiên)
  await page.getByRole('textbox').filter({ hasText: /^$/ }).click();
  await page
    .getByRole('textbox')
    .filter({ hasText: /^$/ })
    .fill('hau test auto testing trên 1 tính năng');

  // blur
  await page.getByText('Tiêu đề ').click();

  //  Nhập nội dung vào textarea
  await page.locator('textarea').click();
  await page.locator('textarea').fill('hau test auto testing trên 1 tính năng');

  // blur
  await page.getByText('Tiêu đề ').click();

  // Mở calendar cho "Thời gian hiển thị"
  await page.getByRole('button', { name: 'Toggle calendar' }).click();
  await page.getByText('20', { exact: true }).click(); // Chọn ngày 12 (giả định tháng và năm mặc định)

  // Click vào "Thời gian hiển thị (*)" (có thể để đảm bảo focus)
  await page.getByText('Thời gian hiển thị (*)').click();

  // Chuyển sang tab "NỘI DUNG BÀI VIẾT" lần nữa
  await page.getByText('NỘI DUNG BÀI VIẾT', { exact: true }).click();

  //  Nhập nội dung vào iframe (editor rich text)
  await page.locator('iframe').contentFrame().getByRole('textbox').click();
  await page.locator('iframe').contentFrame().getByRole('textbox').click(); // Click lại để đảm bảo focus
  await page
    .locator('iframe')
    .contentFrame()
    .getByRole('textbox')
    .fill('hau test ');

  // Mở menu chọn font (ParagraphSelect font)
  await page.getByText('ParagraphSelect font').click();

  // Chuyển sang tab "NỘI DUNG BÀI VIẾT" lần nữa
  await page.getByText('THÔNG TIN BÀI VIẾT', { exact: true }).click();

  await page.waitForTimeout(5000);

  await page.getByLabel('Breadcrumb').getByText('Bài viết chính sách').click();

  // Click breadcrumb "Bài viết chính sách" lần nữa (để quay lại danh sách)
  await page.getByLabel('Breadcrumb').getByText('Bài viết chính sách').click();

  // Nhấn nút hành động đầu tiên (giả định là nút xóa hoặc tương tự)
  await page.locator('.btnCell > .k-button').first().click();

  //  Chọn tùy chọn "Xóa" và hủy
  await page.locator('div').filter({ hasText: /^Xóa$/ }).click();
  await page.getByRole('button', { name: 'KHÔNG' }).click();

  // Nhấn nút hành động đầu tiên lần nữa
  await page.locator('.btnCell > .k-button').first().click();

  // Chọn tùy chọn "Xóa" và xác nhận
  await page
    .locator('div')
    .filter({ hasText: /^Xóa$/ })
    .locator('span')
    .first()
    .click();
  await page.getByRole('button', { name: 'CÓ' }).click();
  // (Dừng vô thời hạn để quan sát, có thể thay bằng assert hoặc submit nếu cần)
  await new Promise(() => {});
});
