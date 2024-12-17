import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});

test("Locator syntax rules", async ({ page }) => {
  await page.locator("#inputEmail1").click();
});

test("user facing loactors", async ({ page }) => {
  // await page.getByRole("textbox", { name: "Email" }).first().click();
  // await page.getByRole("button", { name: "Sign in" }).first().click();

  await page.getByLabel("Email").first().click();

  await page.getByTestId("SignIn").click();
});

test("locating child element", async ({ page }) => {
  await page.locator('nb-card nb-radio :text-is("Option 1")').click();
  await page
    .locator("nb-card")
    .getByRole("button", { name: "Sign in" })
    .first()
    .click();
});

test("locating parent elements", async ({ page }) => {
  await page
    .locator("nb-card", { hasText: "Using the Grid" })
    .getByRole("textbox", { name: "Email" })
    .click();
});

test("Reusing the locators", async ({ page }) => {
  const login = page.locator("nb-card", { hasText: "Basic form" });
  const emailField = login.getByRole("textbox", { name: "Email" });

  await emailField.fill("test@test.com");

  await login.getByRole("textbox", { name: "Password" }).fill("Welcome123");
  await login.locator("nb-checkbox").click();
  await login.getByRole("button").click();

  await expect(emailField).toHaveText("test@test.com");
});

test("extracting values", { tag: "@examopleTag" }, async ({ page }) => {
  const login = page.locator("nb-card", { hasText: "Basic form" });
  const buttonText = await login.locator("button").textContent();

  expect(buttonText).toEqual("Submit");
});
