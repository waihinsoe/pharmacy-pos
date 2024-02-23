/*
  Warnings:

  - You are about to drop the column `employee_id` on the `Sales` table. All the data in the column will be lost.
  - You are about to drop the column `employee_id` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the `Employees` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Roles` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `user_id` to the `Sales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contact_number` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CASHIER', 'ADMIN');

-- DropForeignKey
ALTER TABLE "Employees" DROP CONSTRAINT "Employees_role_id_fkey";

-- DropForeignKey
ALTER TABLE "Sales" DROP CONSTRAINT "Sales_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_employee_id_fkey";

-- AlterTable
ALTER TABLE "Sales" DROP COLUMN "employee_id",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "employee_id",
ADD COLUMN     "contact_number" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "hire_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'CASHIER';

-- DropTable
DROP TABLE "Employees";

-- DropTable
DROP TABLE "Roles";

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
