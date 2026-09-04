-- Uploaded media may be removed without deleting its content record.
ALTER TABLE "Coach" ALTER COLUMN "imageUrl" DROP NOT NULL;
ALTER TABLE "NewsPost" ALTER COLUMN "imageUrl" DROP NOT NULL;
ALTER TABLE "GalleryImage" ALTER COLUMN "imageUrl" DROP NOT NULL;

-- Business location is managed from the CMS instead of public JSX.
ALTER TABLE "SiteSettings" ADD COLUMN "city" TEXT NOT NULL DEFAULT '';
ALTER TABLE "SiteSettings" ADD COLUMN "country" TEXT NOT NULL DEFAULT '';

CREATE TABLE "PageContent" (
  "key" TEXT NOT NULL,
  "eyebrow" TEXT NOT NULL DEFAULT '',
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL DEFAULT '',
  "body" TEXT NOT NULL DEFAULT '',
  "ctaText" TEXT NOT NULL DEFAULT '',
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "PageContent_pkey" PRIMARY KEY ("key")
);

CREATE TABLE "HomeStat" (
  "id" TEXT NOT NULL,
  "value" TEXT NOT NULL,
  "label" TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0,
  "isPublished" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "HomeStat_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "RateLimitBucket" (
  "key" TEXT NOT NULL,
  "count" INTEGER NOT NULL DEFAULT 1,
  "windowStart" TIMESTAMP(3) NOT NULL,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "RateLimitBucket_pkey" PRIMARY KEY ("key")
);
