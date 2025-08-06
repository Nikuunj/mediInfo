-- CreateTable
CREATE TABLE "public"."items" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "UseOf" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "shopUrl" TEXT,
    "price" INTEGER,

    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);
