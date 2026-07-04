-- CreateTable
CREATE TABLE "gallery_images" (
    "id" TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'restaurant',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "gallery_images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "gallery_images_category_idx" ON "gallery_images"("category");

-- CreateIndex
CREATE INDEX "gallery_images_createdAt_idx" ON "gallery_images"("createdAt" DESC);
