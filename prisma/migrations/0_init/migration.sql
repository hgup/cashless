-- CreateEnum
CREATE TYPE "Notifiers" AS ENUM ('WARDEN', 'DIRECTOR', 'PHOTOCOPY');

-- CreateEnum
CREATE TYPE "PrintStatus" AS ENUM ('PENDING', 'PRINTED', 'REJECTED', 'COLLECTED', 'PAID');

-- CreateEnum
CREATE TYPE "PrintDuplexity" AS ENUM ('SINGLE', 'BACK_TO_BACK');

-- CreateEnum
CREATE TYPE "PrintLayout" AS ENUM ('MINI', 'MICRO', 'HANDOUT', 'AS_IT_IS');

-- CreateEnum
CREATE TYPE "PrintOrientations" AS ENUM ('VERTICAL', 'HORIZONTAL', 'AS_IT_IS', 'BEST_FIT');

-- CreateEnum
CREATE TYPE "PrintType" AS ENUM ('PRINTOUT', 'PHOTOCOPY');

-- CreateEnum
CREATE TYPE "Subs" AS ENUM ('THE_HINDU', 'ECONOMIC_TIMES');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'DISABLED');

-- CreateEnum
CREATE TYPE "UserRoles" AS ENUM ('STUDENT', 'PHOTOCOPY', 'ACCOUNTANT', 'TEACHER_ADMIN', 'CENTRAL_ADMIN');

-- CreateEnum
CREATE TYPE "Room" AS ENUM ('A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'S13', 'NA');

-- CreateEnum
CREATE TYPE "Dept" AS ENUM ('NEWSPAPER', 'PHOTOCOPY', 'TRAVEL', 'CASH', 'OTHER');

-- CreateEnum
CREATE TYPE "PaymentMode" AS ENUM ('CASHLESS', 'CASH');

-- CreateTable
CREATE TABLE "users" (
    "regd_no" TEXT NOT NULL,
    "roll_no" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL DEFAULT '1000',
    "balance" INTEGER NOT NULL,
    "room_no" "Room",
    "class" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "photo" TEXT NOT NULL DEFAULT '/images/profile_pics/profile.png',
    "role" "UserRoles" NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("regd_no")
);

-- CreateTable
CREATE TABLE "rooms" (
    "room_no" "Room" NOT NULL,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("room_no")
);

-- CreateTable
CREATE TABLE "room_leaders" (
    "regd_no" TEXT NOT NULL,
    "room_no" "Room" NOT NULL,

    CONSTRAINT "room_leaders_pkey" PRIMARY KEY ("regd_no")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" SERIAL NOT NULL,
    "regd_no" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "particulars" TEXT,
    "department" "Dept",

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriptions" (
    "room_no" "Room" NOT NULL,
    "type" "Subs" NOT NULL,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("room_no","type")
);

-- CreateTable
CREATE TABLE "subscription_details" (
    "id" "Subs" NOT NULL,
    "amount" INTEGER NOT NULL,
    "department" "Dept" NOT NULL,

    CONSTRAINT "subscription_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "photocopy_register" (
    "id" SERIAL NOT NULL,
    "regd_no" TEXT NOT NULL,
    "order_placed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "print_type" "PrintType" NOT NULL DEFAULT 'PHOTOCOPY',
    "orientation" "PrintOrientations" NOT NULL DEFAULT 'AS_IT_IS',
    "page_layout" "PrintLayout" NOT NULL DEFAULT 'AS_IT_IS',
    "sides" "PrintDuplexity" NOT NULL DEFAULT 'BACK_TO_BACK',
    "pages" TEXT,
    "num_of_copies" INTEGER NOT NULL DEFAULT 1,
    "particulars" TEXT,
    "file" TEXT NOT NULL,
    "file_pages" INTEGER NOT NULL DEFAULT 0,
    "call_number" TEXT,
    "status" "PrintStatus" NOT NULL DEFAULT 'PENDING',
    "collected_at" TIMESTAMP(3),
    "notes" TEXT,
    "cost" INTEGER,
    "mode_of_pay" "PaymentMode",
    "paid_at" TIMESTAMP(3),
    "cashless_tid" TEXT,

    CONSTRAINT "photocopy_register_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "message" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "from" "Notifiers" NOT NULL,
    "to" TEXT NOT NULL,
    "dismissed" BOOLEAN NOT NULL,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_roll_no_key" ON "users"("roll_no");

-- CreateIndex
CREATE UNIQUE INDEX "photocopy_register_file_key" ON "photocopy_register"("file");

-- CreateIndex
CREATE UNIQUE INDEX "photocopy_register_cashless_tid_key" ON "photocopy_register"("cashless_tid");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_room_no_fkey" FOREIGN KEY ("room_no") REFERENCES "rooms"("room_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_leaders" ADD CONSTRAINT "room_leaders_regd_no_fkey" FOREIGN KEY ("regd_no") REFERENCES "users"("regd_no") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_leaders" ADD CONSTRAINT "room_leaders_room_no_fkey" FOREIGN KEY ("room_no") REFERENCES "rooms"("room_no") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_regd_no_fkey" FOREIGN KEY ("regd_no") REFERENCES "users"("regd_no") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_room_no_fkey" FOREIGN KEY ("room_no") REFERENCES "rooms"("room_no") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_type_fkey" FOREIGN KEY ("type") REFERENCES "subscription_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photocopy_register" ADD CONSTRAINT "photocopy_register_regd_no_fkey" FOREIGN KEY ("regd_no") REFERENCES "users"("regd_no") ON DELETE RESTRICT ON UPDATE CASCADE;

