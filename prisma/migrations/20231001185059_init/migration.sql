-- CreateTable
CREATE TABLE "Secret" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "iv" TEXT NOT NULL,
    "encryptedData" TEXT NOT NULL,
    "owner" TEXT NOT NULL,

    CONSTRAINT "Secret_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Secret_slug_key" ON "Secret"("slug");
