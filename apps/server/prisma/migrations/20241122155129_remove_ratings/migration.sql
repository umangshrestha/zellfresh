/*
  Warnings:

  - You are about to drop the column `rating` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `totalRating` on the `Product` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "productId" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" REAL NOT NULL,
    "availableQuantity" INTEGER NOT NULL,
    "limitPerTransaction" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "badgeText" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Product" ("availableQuantity", "badgeText", "category", "createdAt", "description", "imageUrl", "limitPerTransaction", "name", "price", "productId", "tags", "unit", "updatedAt") SELECT "availableQuantity", "badgeText", "category", "createdAt", "description", "imageUrl", "limitPerTransaction", "name", "price", "productId", "tags", "unit", "updatedAt" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
