import { test } from '@playwright/test'

test('access to main page', async ({ page }) => {
  await page.goto('http://localhost:3000/')
})
