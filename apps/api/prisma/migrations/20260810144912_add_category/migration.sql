-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- Seed default category so existing products can be assigned
INSERT INTO "Category" ("id", "name", "slug")
VALUES ('00000000-0000-4000-8000-000000000001', 'Uncategorized', 'uncategorized');

-- Add column as nullable first, backfill, then set NOT NULL
ALTER TABLE "Product" ADD COLUMN "categoryId" TEXT;

UPDATE "Product"
SET "categoryId" = '00000000-0000-4000-8000-000000000001'
WHERE "categoryId" IS NULL;

ALTER TABLE "Product" ALTER COLUMN "categoryId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
