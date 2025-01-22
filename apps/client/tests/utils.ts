import { Page } from '@playwright/test';

export function getStoryUrl(storybookUrl: string, id: string): string {
  const params = new URLSearchParams({
    id,
    viewMode: 'story',
    nav: '0',
  });

  return `${storybookUrl}/iframe.html?${params.toString()}`;
}

export async function navigate(
  page: Page,
  storybookUrl: string,
  id: string
): Promise<void> {
  try {
    const url = getStoryUrl(storybookUrl, id);
    await page.goto(url);
    await page.waitForSelector('#storybook-root');
  } catch (error) {
    console.error(`ERROR(visual-regression) navigating to story: ${id}`, error);
  }
}