"use server"

import { z } from "zod"
import prisma from "./db"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import { Dept, PaymentMode, PrintStatus, Status } from "@prisma/client"
import { formatCurrency } from "./utils"

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
        department: "CASH",
      },
    }),
  ])
  const deposited = revalidatePath("/admin/dashboard/services")
}

const PhotocopyPurchase = z.object({
  regd_no: z.string().length(6),
  password: z.coerce.number().lt(10000),
  amount: z.coerce.number(),
  id: z.coerce.number(),
  particulars: z.string(),
})

export async function photocopyPurchaseViaCashless(
  prevState: any,
  formData: FormData
) {
  const validatedFields = PhotocopyPurchase.safeParse({
    regd_no: formData.get("regd_no"),
    password: formData.get("password"),
    amount: formData.get("amount"),
    id: formData.get("id"),
    particulars: formData.get("particulars"),
  })
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid Entry. Retry",
    }
  }

  const { id, regd_no, password, amount, particulars } = validatedFields.data

  const transactAmount = prisma.transactions.create({
    data: {
      regd_no: regd_no,
      department: Dept.PHOTOCOPY,
      amount: amount,
      particulars: particulars,
    },
  })

  const user = await prisma.users.findUnique({
    where: {
      regd_no: regd_no,
    },
    select: {
      password: true,
      name: true,
      balance: true,
    },
  })

  if (user?.password === password.toString()) {
    try {
      if (user.balance < amount) {
        return {
          status: "ERROR",
          message: "Insufficient Balance.",
        }
      }
      const deduct = prisma.users.update({
        where: {
          regd_no: regd_no,
        },
        data: {
          balance: {
            increment: amount,
          },
        },
      })

      const register = prisma.photocopy_register.update({
        where: {
          id: id,
        },
        data: {
          status: PrintStatus.PAID,
          mode_of_pay: PaymentMode.CASHLESS,
        },
      })

      const transaction = await prisma.$transaction([transactAmount, register])
    } catch {
      return {
        message: "Some error Occured. Please contact Admin",
        status: "ERROR",
      }
    }
  } else {
    return {
      message: "Wrong Password",
      status: "ERROR",
    }
  }
  return {
    status: "SUCCESS",
    message: `Payment of ${formatCurrency(amount)} was made by ${user.name}`,
  }
}

export async function revalidatePhotocopy() {
  revalidatePath("/photocopy")
}
