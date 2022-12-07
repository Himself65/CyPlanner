import { test, expect, } from '@playwright/test'

test('access to sign-up page', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  await page.click('button[aria-label="sign-up"]')
  await expect(page).toHaveURL('http://localhost:3000/sign-up')
})

test('success to signup', async ({ page }) => {
  await page.goto('http://localhost:3000/sign-in')
  await page.type('[id="username"]', 'himself65')
  await page.type('[id="password"]', '123456789')
  await page.click('[id="submit"]')
})

test('type something in example page', async ({ page }) => {
  await page.goto('http://localhost:3000/example')
  await page.waitForSelector('.ql-editor');
  const actual = await page.locator('.ql-editor').allInnerTexts();
  expect(actual).toEqual(
    [
      "This is basic example!",
      "You can write any thing you want in markdown.",
      "Doing homework",
      "Play games",
    ]
  );
})
