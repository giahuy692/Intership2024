import { test, expect } from '@playwright/test';
import { autoLogin } from 'e2e/utils/login';

test('Kiểm tra bộ lọc gửi đúng payload', async ({ page }) => {
  await autoLogin(page);
  await page.goto('/#/config/config001-product-list/1');

  await page.getByText('CẤU HÌNH').click();
  await page.getByTitle('Sản phẩm', { exact: true }).click();


  const waitForFilterRequest = async (action: () => Promise<void>) => {
    const requests: any[] = [];
    page.on('request', (req) => {
      if (
        req.url().includes('hapi/product/GetListProduct') &&
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

  // Truy cập trang -> click 'Danh sách Sản phẩm' để load lần đầu
  const initial = await waitForFilterRequest(() =>
    page.getByTitle('Danh sách Sản phẩm', { exact: true }).click()
  );

  const checkbox = page.getByRole('checkbox', { name: 'Label của checkbox' });

  // Assert rằng checkbox mặc định là checked
  await expect(checkbox).toBeChecked();

  expect(initial).toEqual({
    pageSize: 25,
    sort: 'Code-desc',
    page: 1,
    filter:
      '(TypeData~eq~1~and~Status~eq~2)',
  });

  // Click "Đã duyệt" (StatusID = 2)
  const approved = await waitForFilterRequest(() =>
    page.getByRole('button', { name: 'Cắt Code' }).click()
  );
  expect(approved.filter).toBe(
    '(TypeData~eq~1~and~(Status~eq~0~or~Status~eq~2))'
  );

  // Click "Ngưng kinh doanh" (StatusID = 3)
  const hidden = await waitForFilterRequest(() =>
    page.getByRole('button', { name: 'Ngưng kinh doanh' }).click()
  );
  expect(hidden.filter).toBe(
    '(TypeData~eq~1~and~(Status~eq~0~or~Status~eq~2~or~Status~eq~3))'
  );

  // Click "Reset bộ lọc"
  const reset = await waitForFilterRequest(() =>
    page.getByRole('button', { name: 'Reset bộ lọc' }).click()
  );
  expect(reset.filter).toBe(
    '(TypeData~eq~1~and~Status~eq~2)'
  );

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
    pageSize: 50,
    sort: 'Code-desc',
    page: 2,
    filter:
      '(TypeData~eq~1~and~Status~eq~2)',
  });

  // Click "Page 3"
  const page3 = await waitForFilterRequest(() =>
    page.getByRole('button', { name: 'Page 3' }).click()
  );
  expect(page3).toEqual({
    pageSize: 50,
    sort: 'Code-desc',
    page: 3,
    filter:
      '(TypeData~eq~1~and~Status~eq~2)',
  });

  // Click "Page 4"
  const page4 = await waitForFilterRequest(() =>
    page.getByRole('button', { name: 'Page 4' }).click()
  );
  expect(page4).toEqual({
    pageSize: 50,
    sort: 'Code-desc',
    page: 4,
    filter:
      '(TypeData~eq~1~and~Status~eq~2)',
  });

  // Click "Go to the first page"
  const firstPage = await waitForFilterRequest(() =>
    page.getByRole('button', { name: 'Go to the first page' }).click()
  );
  expect(firstPage).toEqual({
    pageSize: 50,
    sort: 'Code-desc',
    page: 1,
    filter:
      '(TypeData~eq~1~and~Status~eq~2)',
  });



  // Nhập tìm kiếm "vải"
  const search = await waitForFilterRequest(async () => {
    await page.getByRole('textbox', { name: 'Tìm kiếm barcode, tên sản phẩ' }).click();
    await page.getByRole('textbox', { name: 'Tìm kiếm barcode, tên sản phẩ' }).fill('vải');
    await page.getByRole('button', { name: 'TÌM', exact: true }).click();
  });
  expect(search).toEqual({
    "Filter": {
      "pageSize": 50,
      "filter": "(TypeData~eq~1~and~Status~eq~2)"
    },
    "Keyword": "vải"
  });

  // Click "Reset bộ lọc"
  const resetAgain = await waitForFilterRequest(() =>
    page.getByRole('button', { name: 'Reset bộ lọc' }).click()
  );
  expect(resetAgain.filter).toBe(
    '(TypeData~eq~1~and~Status~eq~2)'
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
      '(TypeData~eq~1~and~Status~eq~2)',
  });
});
