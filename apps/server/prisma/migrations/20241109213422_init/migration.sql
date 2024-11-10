-- CreateTable
CREATE TABLE "Product" (
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
    "rating" REAL NOT NULL,
    "totalRating" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Categories" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "icon" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "navigateUrl" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "SyncToken" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nextSyncUrl" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "SyncToken_nextSyncUrl_key" ON "SyncToken"("nextSyncUrl");
