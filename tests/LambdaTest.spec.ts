import { expect } from "@playwright/test";
import test from "../lambdatest-setup";
//  import test from '@playwright/test'
const Data = {
  URL: "https://www.lambdatest.com/selenium-playground/",
  WELCOMEMESSAGE: "Welcome to LambdaTest",
  USERNAME: "nshashikala",
  EMAIL: "Testns@yopmail.com",
  PASSWORD: "Test@123",
  COMPANY: "CG company",
  WEBSITE: "www.cg.com",
  COUNTRY: "United States",
  CITY: "New Jersey",
  ADDRESS1: "Street line2",
  ADDRESS2: "Beside Olive",
  STATE: "New York",
  ZIP: "72201",
  SUCCESS: "Thanks for contacting us, we will get back to you shortly.",
};

test.describe("PlayWright Assignment Test Scenarios", async () => {
  test.beforeEach(async ({ page }) => {
    test.step("Launch Application ", async () => {
      await page.goto(Data.URL);
      await page.waitForLoadState("domcontentloaded");
    });
  });

  test("Lambda Test Scenario 1", async ({ page }) => {
    await page.getByRole("link", { name: "Simple Form Demo" }).click();
    await page.getByPlaceholder("Please enter your Message").fill(Data.WELCOMEMESSAGE);
    await page.getByRole("button", { name: "Get Checked Value" }).click();
    await expect(page.locator("#message")).toHaveText(Data.WELCOMEMESSAGE);
  });

  test("Lambda Test Scenario 2", async ({ page }) => {
    await page.waitForEvent('load')
    await page.getByRole("link", { name: "Drag & Drop Sliders" }).click();
    await page.waitForSelector("#slider3");
    let defaultValTxt = await page.locator("#rangeSuccess").innerText();
    expect(defaultValTxt).toBe("15");
    await page.locator("#slider3").getByRole("slider").fill("95");
    let afterValTxt = await page.locator("#rangeSuccess").innerText();
    expect(afterValTxt).toBe("95");
  });

  test("Lambda Test Scenario 3", async ({ page }) => {
    await page.waitForEvent('load')
    await page.getByRole("link", { name: "Input Form Submit" }).click();
    await page.getByRole("button", { name: "Submit" }).click();
    await page.getByPlaceholder("Name", { exact: true }).fill(Data.USERNAME);
    await page.getByPlaceholder("Email", { exact: true }).fill(Data.EMAIL);
    await page.getByPlaceholder("Password").fill(Data.PASSWORD);
    await page.getByPlaceholder("Company").fill(Data.COMPANY);
    await page.getByPlaceholder("Website").fill(Data.WEBSITE);
    await page.getByRole("combobox").selectOption(Data.COUNTRY);
    await page.getByPlaceholder("City").fill(Data.CITY);
    await page.getByPlaceholder("Address 1").fill(Data.ADDRESS1);
    await page.getByPlaceholder("Address 2").fill(Data.ADDRESS2);
    await page.getByPlaceholder("State").fill(Data.STATE);
    await page.getByPlaceholder("Zip code").fill(Data.ZIP);
    await page.getByRole("button", { name: "Submit" }).click();
    await page.waitForTimeout(2000);
    const successMessage = await page
      .locator('//*[contains(@class,"loginform")]//p')
      .textContent();
    expect(successMessage).toBe(Data.SUCCESS);
  });
});
