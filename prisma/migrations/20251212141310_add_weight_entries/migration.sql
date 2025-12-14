-- CreateTable
CREATE TABLE "weight_entries" (
    "id" TEXT NOT NULL,
    "weight" DECIMAL(5,2) NOT NULL,
    "unit" TEXT NOT NULL DEFAULT 'kg',
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "weight_entries_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "weight_entries" ADD CONSTRAINT "weight_entries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
