import { test, expect, PageScreenshotOptions } from '@playwright/test';
import { navigate } from './utils';

const STORYBOOK_URL = 'http://localhost:6006';

const options: PageScreenshotOptions = {
  fullPage: true,
  animations: 'disabled',
};

const VISUAL_STORIES = [
  {
    "id": "cart-icon--docs",
    "title": "Cart/Icon"
  },
  {
    "id": "cart-icon--default",
    "title": "Cart/Icon"
  },
  {
    "id": "cart-item--docs",
    "title": "Cart/Item"
  },
  {
    "id": "cart-item--default",
    "title": "Cart/Item"
  },
  {
    "id": "cart-skeleton--docs",
    "title": "Cart/Skeleton"
  },
  {
    "id": "cart-skeleton--default",
    "title": "Cart/Skeleton"
  },
  {
    "id": "cart-page-empty--docs",
    "title": "Cart/Page/Empty"
  },
  {
    "id": "cart-page-empty--default",
    "title": "Cart/Page/Empty"
  },
  {
    "id": "cart-page-loading--docs",
    "title": "Cart/Page/Loading"
  },
  {
    "id": "cart-page-loading--default",
    "title": "Cart/Page/Loading"
  },
  {
    "id": "cart-page--docs",
    "title": "Cart/Page"
  },
  {
    "id": "cart-page--default",
    "title": "Cart/Page"
  },
  {
    "id": "category-list--docs",
    "title": "Category/List"
  },
  {
    "id": "category-list--default",
    "title": "Category/List"
  },
  {
    "id": "category-section--docs",
    "title": "Category/Section"
  },
  {
    "id": "category-section--default",
    "title": "Category/Section"
  },
  {
    "id": "deliverystatus-chip--docs",
    "title": "DeliveryStatus/Chip"
  },
  {
    "id": "deliverystatus-chip--delivered",
    "title": "DeliveryStatus/Chip"
  },
  {
    "id": "deliverystatus-chip--pending",
    "title": "DeliveryStatus/Chip"
  },
  {
    "id": "deliverystatus-chip--shipped",
    "title": "DeliveryStatus/Chip"
  },
  {
    "id": "deliverystatus-chip--cancelled",
    "title": "DeliveryStatus/Chip"
  },
  {
    "id": "deliverystatus-chip--refunded",
    "title": "DeliveryStatus/Chip"
  },
  {
    "id": "deliverystatus-chip--processing",
    "title": "DeliveryStatus/Chip"
  },
  {
    "id": "error-page-frontend--docs",
    "title": "Error/Page/Frontend"
  },
  {
    "id": "error-page-frontend--default",
    "title": "Error/Page/Frontend"
  },
  {
    "id": "errorcomponent--docs",
    "title": "ErrorComponent"
  },
  {
    "id": "errorcomponent--default",
    "title": "ErrorComponent"
  },
  {
    "id": "errorcomponent--without-image",
    "title": "ErrorComponent"
  },
  {
    "id": "errorcomponent--without-cta",
    "title": "ErrorComponent"
  },
  {
    "id": "error-page-notfound--docs",
    "title": "Error/Page/NotFound"
  },
  {
    "id": "error-page-notfound--default",
    "title": "Error/Page/NotFound"
  },
  {
    "id": "footer--docs",
    "title": "Footer"
  },
  {
    "id": "footer--default",
    "title": "Footer"
  },
  {
    "id": "imagebutton--docs",
    "title": "ImageButton"
  },
  {
    "id": "imagebutton--default",
    "title": "ImageButton"
  },
  {
    "id": "button-loadingbutton--docs",
    "title": "button/LoadingButton"
  },
  {
    "id": "button-loadingbutton--loading-button-story",
    "title": "button/LoadingButton"
  },
  {
    "id": "button-loadingbutton--default",
    "title": "button/LoadingButton"
  },
  {
    "id": "button-loadingbutton--loading",
    "title": "button/LoadingButton"
  },
  {
    "id": "loadingspinner--docs",
    "title": "LoadingSpinner"
  },
  {
    "id": "loadingspinner--default",
    "title": "LoadingSpinner"
  },
  {
    "id": "markdowncomponent--docs",
    "title": "MarkdownComponent"
  },
  {
    "id": "markdowncomponent--default",
    "title": "MarkdownComponent"
  },
  {
    "id": "markdowncomponent--data",
    "title": "MarkdownComponent"
  },
  {
    "id": "markdowncomponent--loading",
    "title": "MarkdownComponent"
  },
  {
    "id": "markdowncomponent--error",
    "title": "MarkdownComponent"
  },
  {
    "id": "markdown-skeleton--docs",
    "title": "Markdown/Skeleton "
  },
  {
    "id": "markdown-skeleton--default",
    "title": "Markdown/Skeleton "
  },
  {
    "id": "notification--docs",
    "title": "Notification"
  },
  {
    "id": "notification--default",
    "title": "Notification"
  },
  {
    "id": "notification--success",
    "title": "Notification"
  },
  {
    "id": "notification--error",
    "title": "Notification"
  },
  {
    "id": "notification--warning",
    "title": "Notification"
  },
  {
    "id": "notification--info",
    "title": "Notification"
  },
  {
    "id": "order-list--docs",
    "title": "Order/List"
  },
  {
    "id": "order-list--default",
    "title": "Order/List"
  },
  {
    "id": "order-emptypage--docs",
    "title": "Order/EmptyPage"
  },
  {
    "id": "order-emptypage--default",
    "title": "Order/EmptyPage"
  },
  {
    "id": "order-item--docs",
    "title": "Order/Item"
  },
  {
    "id": "order-item--default",
    "title": "Order/Item"
  },
  {
    "id": "order-skeleton--docs",
    "title": "Order/Skeleton"
  },
  {
    "id": "order-skeleton--default",
    "title": "Order/Skeleton"
  },
  {
    "id": "order-placed--docs",
    "title": "Order/Placed"
  },
  {
    "id": "order-placed--default",
    "title": "Order/Placed"
  },
  {
    "id": "product-item--docs",
    "title": "Product/Item"
  },
  {
    "id": "product-item--default",
    "title": "Product/Item"
  },
  {
    "id": "product-item--with-badge",
    "title": "Product/Item"
  },
  {
    "id": "product-item--disabled",
    "title": "Product/Item"
  },
  {
    "id": "product-skeleton--docs",
    "title": "Product/Skeleton"
  },
  {
    "id": "product-skeleton--default",
    "title": "Product/Skeleton"
  },
  {
    "id": "product-page-empty--docs",
    "title": "Product/Page/Empty"
  },
  {
    "id": "product-page-empty--default",
    "title": "Product/Page/Empty"
  },
  {
    "id": "product-page-loading--docs",
    "title": "Product/Page/Loading"
  },
  {
    "id": "product-page-loading--default",
    "title": "Product/Page/Loading"
  },
  {
    "id": "product-list--docs",
    "title": "Product/List"
  },
  {
    "id": "product-list--default",
    "title": "Product/List"
  },
  {
    "id": "address-item--docs",
    "title": "Address/Item"
  },
  {
    "id": "address-item--default",
    "title": "Address/Item"
  },
  {
    "id": "address-item--not-default",
    "title": "Address/Item"
  },
  {
    "id": "address-item--empty",
    "title": "Address/Item"
  },
  {
    "id": "address-item--saving",
    "title": "Address/Item"
  },
  {
    "id": "profile-contactdetails--docs",
    "title": "Profile/ContactDetails"
  },
  {
    "id": "profile-contactdetails--default",
    "title": "Profile/ContactDetails"
  },
  {
    "id": "customerexperiencerating--docs",
    "title": "CustomerExperienceRating"
  },
  {
    "id": "customerexperiencerating--default",
    "title": "CustomerExperienceRating"
  },
  {
    "id": "ratingdialog--docs",
    "title": "RatingDialog"
  },
  {
    "id": "ratingdialog--default",
    "title": "RatingDialog"
  },
  {
    "id": "ratingdialog--last-rating",
    "title": "RatingDialog"
  },
  {
    "id": "servererrorpage--docs",
    "title": "ServerErrorPage"
  },
  {
    "id": "servererrorpage--default",
    "title": "ServerErrorPage"
  },
  {
    "id": "splitbutton--docs",
    "title": "SplitButton"
  },
  {
    "id": "splitbutton--default",
    "title": "SplitButton"
  }
]

test.describe('Storybook Components', async () => {

  VISUAL_STORIES.forEach((story) => {
    test(story.id, async ({ page }) => {
      await navigate(page, STORYBOOK_URL, story.id);
      const upstreamScreenshot = `${story.title}-upstream-${process.platform}.png`;
  
      const screenshot = await page.screenshot({
        path: `tests/${story.title}-current-${process.platform}.png`,
        ...options
      });
  
      expect(screenshot).toMatchSnapshot(upstreamScreenshot);
    });
  });
});