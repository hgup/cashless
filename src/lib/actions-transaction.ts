"use server"

import { z } from "zod"
import prisma from "./db"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"

export async function depositMoneyToId(
  regd_no: string,
  money: string,
  particulars: string
) {
  const amount_in_paise = Number(money) * 100
  const myauth = await auth()
  await prisma.$transaction([
    prisma.users.update({
      where: {
        regd_no: regd_no,
      },
      data: {
        balance: {
          increment: amount_in_paise,
        },
      },
    }),
    prisma.transactions.create({
      data: {
        regd_no: regd_no,
        amount: amount_in_paise,
        particulars: `Deposit by [${myauth?.user.name}] ${particulars}`,
        department: "OTHER",
      },
    }),
  ])
  const deposited = revalidatePath("/admin/dashboard/services")
}
