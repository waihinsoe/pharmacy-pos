/*
  Warnings:

  - The `payment_method` column on the `Sales` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Payment" AS ENUM ('CASH', 'KPAY');

-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "cost" INTEGER NOT NULL DEFAULT 200;

-- AlterTable
ALTER TABLE "Sales" ALTER COLUMN "customer_id" DROP NOT NULL,
DROP COLUMN "payment_method",
ADD COLUMN     "payment_method" "Payment" NOT NULL DEFAULT 'CASH';
