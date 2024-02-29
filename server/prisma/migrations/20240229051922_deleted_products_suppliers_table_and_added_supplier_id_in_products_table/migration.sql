/*
  Warnings:

  - You are about to drop the column `img_url` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the `Products_Suppliers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `supplier_id` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Products_Suppliers" DROP CONSTRAINT "Products_Suppliers_product_id_fkey";

-- DropForeignKey
ALTER TABLE "Products_Suppliers" DROP CONSTRAINT "Products_Suppliers_supplier_id_fkey";

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "img_url",
ADD COLUMN     "supplier_id" INTEGER NOT NULL,
ALTER COLUMN "expriy_date" SET DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "Products_Suppliers";

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "Suppliers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
