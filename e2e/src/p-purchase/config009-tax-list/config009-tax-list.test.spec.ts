import { test, expect, Page } from '@playwright/test';
import { autoLogin } from 'e2e/utils/login';
import { DTOTax } from './../../../../src/app/p-app/p-config/shared/dto/DTOTax';
import { DTOPermission } from 'src/app/p-app/p-layout/dto/DTOPermission';
import { data } from 'jquery';
import { DTOActionPermission } from 'src/app/p-app/p-layout/dto/DTOActionPermission';
import { DTOListCountry } from 'src/app/p-app/p-hri/shared/dto/DTOPersonalInfo.dto';
import { DTOTaxGroup } from 'src/app/p-app/p-config/shared/dto/DTOTaxGroup';
import { Ps_UtilObjectService } from './../../../../src/app/p-lib/utilities/utility.object';


// Xử lý vào trang Quản lý khai quan
export const goToPage = async (page: Page): Promise<void> => {
  await autoLogin(page);
  await page.goto('/#/ecommerce/ecom013-dashboard/1');
  await page.getByText('Mua hàng').click();
  await page.getByTitle('Quản lý khai quan', { exact: true }).click();
};

// Hàm nhận respone từ các API
const waitForApiResponse = async (page, urlContains: string, action: () => Promise<void>) => {
  const responsePromise = page.waitForResponse(res =>
    res.url().includes(urlContains) && res.request().method() === 'POST'
  );
  await action();
  const response = await responsePromise;
  return await response.json();
};

// Hàm so sánh các trường trong dữ liệu truyền vào so với DTO được truyền vào
const validateFieldsMatchDTO = <T>(
  dataList: any[],
  DTOClass: new () => T,
  label = 'item'
): boolean => {
  const requiredFields = Object.keys(new DTOClass());

  const allItemsValid = dataList.every((item, index) => {
    const missingFields = requiredFields.filter(field => !(field in item));
    if (missingFields.length > 0) {
      console.log(`❌ ${label} ${index + 1} thiếu các trường:`, missingFields);
      return false;
    }
    return true;
  });

  return allItemsValid;
};

const getPastResponseFromNetwork = async (page: Page, targetUrlContains: string): Promise<any> => {
  const client = await page.context().newCDPSession(page);
  await client.send('Network.enable');

  const responses: Record<string, any> = {};
  const matchingRequestIds: Set<string> = new Set();

  // Ghi nhận những response nào phù hợp
  client.on('Network.responseReceived', (params) => {
    const { response, requestId } = params;
    if (response.url.includes(targetUrlContains) && response.status === 200) {
      matchingRequestIds.add(requestId);
    }
  });

  // Khi tải xong response, lấy body
  client.on('Network.loadingFinished', async (params) => {
    const { requestId } = params;
    if (matchingRequestIds.has(requestId)) {
      try {
        const body = await client.send('Network.getResponseBody', { requestId });
        const json = JSON.parse(body.body);
        responses[requestId] = json;
      } catch (err) {
        console.warn('⚠️ Không lấy được body:', err);
      }
    }
  });

  // Chờ vài giây sau khi trang load để có đủ response
  await page.waitForTimeout(3000);

  // Trả về response đầu tiên bắt được
  const firstResponse = Object.values(responses)[0];
  if (!firstResponse) throw new Error('❌ Không tìm thấy response phù hợp.');
  return firstResponse;
};



test('Check response có đủ field trong DTOTax', async ({ page }) => {
  await goToPage(page);
  const response = await waitForApiResponse(page, '/api/tax/GetListTax', async () => {
    await page.waitForTimeout(2000);
  });

  const dataList = response?.ObjectReturn?.Data;
  expect(Array.isArray(dataList)).toBe(true);

  const valid = validateFieldsMatchDTO(dataList, DTOTax, 'Tax');
  expect(valid).toBe(true);
});

test('Check response có đủ field trong DTOListCountry', async ({ page }) => {
  await goToPage(page);
  const response = await waitForApiResponse(page, '/api/conf/GetListCountry', async () => {
    await page.waitForTimeout(2000);
  });

  const dataList = response?.ObjectReturn?.Data;
  expect(Array.isArray(dataList)).toBe(true);

  const valid = validateFieldsMatchDTO(dataList, DTOListCountry, 'Country');
  expect(valid).toBe(true);
});

test('Check response có đủ field trong DTOTaxGroup', async ({ page }) => {
  await goToPage(page);
  const response = await waitForApiResponse(page, '/api/taxgroup/GetListTaxGroup', async () => {
    await page.waitForTimeout(2000);
  });

  const dataList = response?.ObjectReturn?.Data;
  expect(Array.isArray(dataList)).toBe(true);

  const valid = validateFieldsMatchDTO(dataList, DTOTaxGroup, 'TaxGroup');
  expect(valid).toBe(true);
});

test('Kiểm tra payload mặc định của API GetListTax', async ({ page }) => {
  let capturedPayload: any = null;

  // Nghe mọi request để bắt payload gửi đi
  page.on('request', async (request) => {
    if (
      request.url().includes('/api/tax/GetListTax') &&
      request.method() === 'POST'
    ) {
      try {
        const postData = request.postData();
        capturedPayload = JSON.parse(postData || '{}');
      } catch (e) {
        console.error('❌ Không đọc được payload:', e);
      }
    }
  });

  await goToPage(page);

  await page.waitForTimeout(2000); // chờ để đảm bảo request được gửi

  expect(capturedPayload).not.toBeNull();

  // Kiểm tra payload
  expect(capturedPayload).toEqual({
    page: 1,
    pageSize: 25,
    sort: "Code-desc",
    filter: "(StatusID~eq~0~or~StatusID~eq~4~or~StatusID~eq~1)"
  });

  // Nếu muốn kiểm tra từng phần của payload
  // expect(capturedPayload.page).toBe(1);
  // expect(capturedPayload.pageSize).toBe(25);
  // expect(capturedPayload.sort).toBe('Code-desc');
  // expect(capturedPayload.filter).toBe('(StatusID~eq~0~or~StatusID~eq~4~or~StatusID~eq~1)');
});


test('Check response mặc định của danh sách Tax có phải là status "Đang soạn thảo", "Gửi duyệt", "Trả về"', async ({ page }) => {
  await goToPage(page);
  const response = await waitForApiResponse(page, '/api/tax/GetListTax', async () => {
    await page.waitForTimeout(2000);
  });

  const dataList = response?.ObjectReturn?.Data;
  expect(Array.isArray(dataList)).toBe(true);

  // Kiểm tra toàn bộ status có hợp lệ không
  const validDefaultStatus = dataList.every(item => [0, 1, 4].includes(item.StatusID));

  // Nếu có sai thì log ra những cái sai
  if (!validDefaultStatus) {
    const invalidItems = dataList.filter(item => ![0, 1, 4].includes(item.StatusID));
    console.log('❌ Các item có status không hợp lệ:', invalidItems);
  }

  expect(validDefaultStatus).toBe(true);
});

test('Check action dropdown của dòng có trạng thái "Trả về"', async ({ page }) => {
  await goToPage(page);

  // Chờ dữ liệu load
  await page.waitForTimeout(3000);

  // Tìm dòng đầu tiên có trạng thái "Trả về"
  const targetRow = page.locator('tr:has-text("Đang soạn thảo")').first();
  console.log(targetRow);
  
  // Nếu không tìm thấy status Đang soạn thảo
  if (!Ps_UtilObjectService.hasValue(targetRow)) {
    console.log('❌ Không tìm thấy item có status Đang soạn thảo');
  }
  else {
    await expect(targetRow).toBeVisible();
  }

  // Click nút "..." trong dòng đó
  const actionButton = targetRow.locator('button').last();
  await actionButton.click();

  // Kiểm tra dropdown hiện ra
  const popup = page.locator('kendo-popup[style*="visibility: visible"] .k-popup');
  // await expect(popup).toBeVisible();

  // // Kiểm tra nội dung dropdown
  // await expect(popup.locator('.popup-item-text')).toHaveText(['Chỉnh sửa', 'Gửi duyệt']);
  await new Promise(() => {});

});






// test('Test API', async({page, request}) => {
//   await goToPage(page)
//   const response = await waitForApiResponse(page, '/api/taxgroup/GetListTaxGroup', async () => {
//     await page.waitForTimeout(2000);
//   });
//   const dataList = response?.ObjectReturn?.Data;
//   console.log('✔️ Dữ liệu trả về:', dataList);
// })







