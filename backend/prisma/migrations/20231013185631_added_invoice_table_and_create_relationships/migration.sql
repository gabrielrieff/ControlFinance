-- CreateTable
CREATE TABLE "inovoices" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "type" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,

    CONSTRAINT "inovoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "repeatedInvoices" (
    "id" TEXT NOT NULL,
    "dateInit" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "dateEnd" TIMESTAMP(3) NOT NULL,
    "invoiceId" TEXT NOT NULL,

    CONSTRAINT "repeatedInvoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "inovoices" ADD CONSTRAINT "inovoices_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inovoices" ADD CONSTRAINT "inovoices_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "repeatedInvoices" ADD CONSTRAINT "repeatedInvoices_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "inovoices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
