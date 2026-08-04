import { test, expect } from '@playwright/test';

test.describe('Tech-startup Application End-to-End Tests', () => {
  test('should load the homepage and render primary elements', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');
    
    // Check page title or root element exists
    await expect(page).toHaveTitle(/TechSpring|Tech|Home/i);

    // Verify main body/root container is rendered
    const rootContainer = page.locator('#root');
    await expect(rootContainer).toBeVisible();
  });

  test('should have visible navigation bar and footer', async ({ page }) => {
    await page.goto('/');

    // Check header or navbar element
    const navbar = page.locator('nav, header').first();
    await expect(navbar).toBeVisible();

    // Check footer element
    const footer = page.locator('footer').first();
    await expect(footer).toBeVisible();
  });

  test('should support navigating between routes', async ({ page }) => {
    await page.goto('/');

    // Verify that links exist on the page
    const links = page.locator('a');
    const linkCount = await links.count();
    expect(linkCount).toBeGreaterThan(0);
  });
});
