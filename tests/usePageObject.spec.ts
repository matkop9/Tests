import { test } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";
import {faker} from '@faker-js/faker'

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Navigate to form page", async ({ page }) => {
  const pm = new PageManager(page)
 
  await pm.navigateTo().formLayoutPage();
  await pm.navigateTo().datePickerPage();
  await pm.navigateTo().smartTablePage();
  await pm.navigateTo().toastrPage();
  await pm.navigateTo().tooltipPage();
});

test("Parametrized methods", async ({ page }) => {
  const pm = new PageManager(page)

const randomFullName  = faker.person.fullName()
const randomFullName2  = faker.person.fullName()
const randomEmail  = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`


  await pm.navigateTo().formLayoutPage();
  await pm.onFormLayoutPage().submitUsingTheGridFormWithCredentialsAndSelectOpitons(randomFullName2,"password123","Option 2");
  await page.screenshot({path: 'screenshots/formLayoutsPage.png'})
  await pm.onFormLayoutPage().submitInlineFormWithNameEmailAndCheckbox(randomFullName,randomEmail, false)
  await page.locator("nb-card", {hasText: "Using the Grid"}).screenshot({path:'screenshots/inlineForm.png'})
  await pm.navigateTo().datePickerPage()
  // await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(1)
  await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(2,15)
});

