;("use server")

import { z } from "zod"
import prisma from "./db"
import { revalidatePath, unstable_noStore as noStore } from "next/cache"
import { redirect } from "next/navigation"
import { AuthError } from "next-auth"
import { signIn } from "@/auth"
import { $Enums, Room, UserRoles } from "@prisma/client"

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData)
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials."
        default:
          return "Something went wrong."
      }
    }
    throw error
  }
}
//  regd_no: string;
//     roll_no: string;
//     name: string;
//     password: string;
//     balance: number;
//     room_no: $Enums.Room;
//     class: string;
//     status: $Enums.Status;
//     photo: Buffer | null;
//     role:

const FormSchema = z.object({
  regd_no: z.string(),
  name: z.string({
    invalid_type_error: "Please select a customer",
  }),
  password: z.string({}),
  balance: z.coerce
    .number()
    .gt(0, { message: "Please enter a number greater than $0 :/" }),
  room_no: z.enum(
    [
      "A1",
      "A2",
      "A3",
      "A4",
      "A5",
      "A6",
      "A7",
      "A8",
      "B1",
      "B2",
      "B3",
      "B4",
      "B5",
      "B6",
      "B7",
      "B8",
      "C1",
      "C2",
      "C3",
      "C4",
      "C5",
      "C6",
      "C7",
      "C8",
      "S13",
    ],
    {
      invalid_type_error: "Room doesn't exist",
    }
  ),
  status: z.enum(["ACTIVE", "DISABLED"], {
    invalid_type_error: "Please select an invoice status",
  }),
  role: z.enum([
    "STUDENT",
    "PHOTOCOPY",
    "ACCOUNTANT",
    "TEACHER_ADMIN",
    "CENTRAL_ADMIN",
  ]),
})

const UpdateStudent = FormSchema.omit({ regd_no: true })

export async function updateStudent(regd_no: string, data: any) {
  console.log(data)
}

export async function createStudent(regd_no: string, data: any) {
  console.log(data)
}
