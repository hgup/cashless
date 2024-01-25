"use server"

import { z } from "zod"
import prisma from "./db"
import { revalidatePath, unstable_noStore as noStore } from "next/cache"
import { redirect } from "next/navigation"
import { AuthError } from "next-auth"
import { signIn } from "@/auth"
import { Room, Status, UserRoles } from "@prisma/client"

export type State = {
  errors?: {
    picture?: string[]
    name?: string[]
    regd_no?: string[]
    password?: string[]
    balance?: string[]
    room_no?: string[]
    class?: string[]
    role?: string[]
    status?: string[]
    room_leaders?: string[]
    subscriptions?: []
  }
  message?: string | null
}

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

// const status_options: Status[] = ["ACTIVE", "DISABLED"] as const
const status_options = ["ACTIVE", "DISABLED"] as const
const MAX_FILE_SIZE = 3000000
const ACCEPTED_IMAGE_TYPES = ["image/png"]
const room_numbers = [
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
] as const
// {Object.values(Room).map((num) => (
//   <option key={Room[num]} value={num}>
//     {Room[num]}
//   </option>
// ))}
const FormSchema = z.object({
  picture: z
    .any()
    .optional()
    .refine((file) => {
      console.log("don't check file size", file.size)
      return file?.size <= MAX_FILE_SIZE
    }, `Max image size is 3MB.`)
    .refine((file) => {
      if (file.size == 0) return true
      else return ACCEPTED_IMAGE_TYPES.includes(file?.type)
    }, "Only .png formats are supported."),

  regd_no: z.string().min(4),

  name: z.string().trim().min(1),

  password: z.string({}),

  balance: z.coerce
    .number()
    .gt(0, { message: "Please enter a number greater than $0 :/" }),

  room_no: z.enum(room_numbers, {
    invalid_type_error: "Room doesn't exist",
  }),

  _class: z.string({
    invalid_type_error: "Please Enter a class",
  }),

  role: z.enum([
    "STUDENT",
    "PHOTOCOPY",
    "ACCOUNTANT",
    "TEACHER_ADMIN",
    "CENTRAL_ADMIN",
  ]),

  status: z.enum(status_options, {
    invalid_type_error: "Please select an invoice status",
  }),
})

const UpdateStudent = FormSchema.omit({ regd_no: true, balance: true })

export async function updateStudent(
  regd_no: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = UpdateStudent.safeParse({
    picture: formData.get("picture"),
    name: formData.get("name"),
    room_no: formData.get("room_no"),
    _class: formData.get("class"),
    role: formData.get("role"),
    status: formData.get("status"),
    password: formData.get("password"),
  })
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Student",
    }
  }
  const { picture, name, room_no, _class, role, status, password } =
    validatedFields.data
  try {
    const userupdated = await prisma.users.update({
      where: {
        regd_no: regd_no,
      },
      data: {
        name: name,
        room_no: room_no,
        class: _class,
        role: role,
        status: status,
        password: password,
      },
    })
  } catch (error) {
    return {
      message: "Database error: Failed to Update Student",
    }
  }

  revalidatePath("/dashboard/student")
  redirect("/dashboard/student")
}

export async function createStudent(regd_no: string, data: any) {
  console.log("check:", data)
}

export async function updateRoom(
  room_no: Room,
  prevState: State,
  formData: FormData
) {
  return {}
}
