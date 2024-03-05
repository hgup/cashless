"use server"

import { z } from "zod"
import prisma from "./db"
import { revalidatePath, unstable_noStore as noStore } from "next/cache"
import { redirect } from "next/navigation"
import { AuthError } from "next-auth"
import { signIn, signOut } from "@/auth"
import {
  PrintOrientations,
  PrintType,
  PrintLayout,
  PrintDuplexity,
  Room,
  Subs,
} from "@prisma/client"
import { UpdateRoomFormSchema } from "@/app/admin/dashboard/rooms/[id]/edit/edit-form"
import fs from "fs"
import {
  MAX_PRINT_FILE_SIZE,
  MAX_FILE_SIZE,
  ACCEPTED_IMAGE_TYPES,
  status_options,
  room_numbers,
} from "./config"
import { UpdateUserFormSchema } from "@/app/settings/edit-form"

export type OrderState = {
  errors?: {
    file?: string[]
  }
  message?: string | null
}

export type OrderUpdateState = {
  errors?: {
    print_type?: string[]
    orientation?: string[]
    page_layout?: string[]
    sides?: string[]
    pages?: string[]
    num_of_copies?: string[]
    particulars?: string[]
    role?: string[]
  }
  message?: string | null
}

export type State = {
  errors?: {
    photo?: string[]
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
    // sign in throws an error by default that redirects the user
  }
}

// {Object.values(Room).map((num) => (
//   <option key={Room[num]} value={num}>
//     {Room[num]}
//   </option>
// ))}
const StudentFormSchema = z.object({
  photo: z
    .any()
    .optional()
    .refine((file) => {
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

  room_no: z
    .enum(room_numbers, {
      invalid_type_error: "Room doesn't exist",
    })
    .optional(),

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

const UpdateStudent = StudentFormSchema.omit({ regd_no: true, balance: true })

export async function updateUser(data: UpdateUserFormSchema, regd_no: string) {
  try {
    const userupdated = await prisma.users.update({
      where: {
        regd_no: regd_no,
      },
      data: {
        password: data.password,
      },
    })
  } catch (error) {
    return {
      message: "Database error: Failed to Update Student",
    }
  }

  redirect("/login")
}

export async function updateStudent(
  regd_no: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = UpdateStudent.safeParse({
    photo: formData.get("photo"),
    name: formData.get("name"),
    room_no: formData.get("room_no") ?? undefined,
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
  const { photo, name, room_no, _class, role, status, password } =
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
        photo: `/images/users/${regd_no}.png`,
      },
    })
  } catch (error) {
    console.error(error)
    return {
      message: "Database error: Failed to Update Student",
    }
  }

  if (photo.size) {
    const formArray = new Int8Array(await photo.arrayBuffer())
    fs.writeFile(
      `${process.cwd()}/public/images/users/${regd_no}.png`,
      formArray,
      function (err) {
        if (err) return console.error(err)
      }
    )
  }

  revalidatePath("/admin/dashboard/student")
  redirect("/admin/dashboard/student")
}

export async function createStudent(regd_no: string, data: any) {
  console.log("check:", data)
}

export async function updateRoom(data: UpdateRoomFormSchema, room_no: Room) {
  try {
    await prisma.room_leaders.deleteMany({
      where: {
        room_no: room_no,
      },
    })
    const leadersend = [{ regd_no: data.room_leaderA, room_no: room_no }]
    if (data.room_leaderB)
      leadersend.push({ regd_no: data.room_leaderB, room_no: room_no })
    await prisma.room_leaders.createMany({
      data: leadersend,
    })
  } catch (err) {
    console.error("Database Error", err)
    throw new Error("Failed to update Leaders Info")
  }

  try {
    await prisma.subscriptions.deleteMany({
      where: {
        room_no: room_no,
        details: {
          department: "NEWSPAPER",
        },
      },
    })
    const subsend = []
    if (data.economic_times)
      subsend.push({ room_no: room_no, type: Subs.ECONOMIC_TIMES })
    if (data.the_hindu) subsend.push({ room_no: room_no, type: Subs.THE_HINDU })
    await prisma.subscriptions.createMany({
      data: subsend,
    })
  } catch (err) {
    console.error("Database Error", err)
    throw new Error("Failed to update Room Subscriptions Info")
  }

  revalidatePath("/admin/dashboard/rooms")
  redirect(
    `/admin/dashboard/rooms?page=${"ABCS".indexOf(Array.from(room_no)[0]) + 1}`
  )
}

async function setPhotos() {
  const students = await prisma?.users.findMany()
  students?.forEach(async (student) => {
    await prisma?.users.update({
      where: {
        regd_no: student.regd_no,
      },
      data: {
        photo: `/images/users/${student.regd_no}.png`,
      },
    })
  })
}

export async function signOutAction() {
  await signOut()
}

export async function runAction() {
  // dada()
  // timeend.setHours(23, 59, 59)
  // console.log(time)
  // const output = await prisma?.transactions.findMany({
  //   where: {
  //     date: {
  //       gte: timestart,
  //       lte: timeend,
  //     },
  //   },
  // })

  const lastweek = new Date(new Date().setUTCDate(new Date().getUTCDate() - 7))
  // // console.log(output)
  // const timestart = new Date("Mon Jan 28 2024")
  // const timeend = new Date("Mon Jan 28 2024")
  const regd_no = 211219
  console.log(
    await prisma.$queryRaw`
SELECT date(date) as day, SUM(amount) as total_sales 
FROM transactions where regd_no=${regd_no} && amount < 0
GROUP BY day having day > ${lastweek};
`
  )

  console.log("ran action successfully")
}

export async function updateStudentUser(
  data: UpdateUserFormSchema,
  regd_no: string
) {
  try {
    const userupdated = await prisma.users.update({
      where: {
        regd_no: regd_no,
      },
      data: {
        password: data.password,
      },
    })
  } catch (error) {
    return {
      message: "Database error: Failed to Update Student",
    }
  }
  console.log("Update Student Successfully")
}

const OrderFormSchema = z.object({
  id: z.number(),
  regd_no: z.number(),
  print_type: z
    .enum([PrintType.PHOTOCOPY, PrintType.PRINTOUT])
    .default(PrintType.PHOTOCOPY),
  orientation: z
    .enum([
      PrintOrientations.AS_IT_IS,
      PrintOrientations.BEST_FIT,
      PrintOrientations.HORIZONTAL,
      PrintOrientations.VERTICAL,
    ])
    .default(PrintOrientations.AS_IT_IS),
  page_layout: z
    .enum([
      PrintLayout.AS_IT_IS,
      PrintLayout.HANDOUT,
      PrintLayout.MICRO,
      PrintLayout.MINI,
    ])
    .default(PrintLayout.AS_IT_IS),
  sides: z
    .enum([PrintDuplexity.BACK_TO_BACK, PrintDuplexity.SINGLE])
    .default(PrintDuplexity.BACK_TO_BACK),
  pages: z.string().optional(),
  num_of_copies: z.coerce.number().min(1),
  file: z
    .any()
    .refine((file) => file?.size != 0, "Please upload a File")
    .refine((file) => {
      return file?.size <= MAX_PRINT_FILE_SIZE
    }, `Max File size is 100MB.`),
  file_pages: z.coerce.number(),
  call_number: z.string().optional(),
  particulars: z.string().optional(),
})

const UploadOrder = OrderFormSchema.omit({
  id: true,
  regd_no: true,
  print_type: true,
  orientation: true,
  page_layout: true,
  sides: true,
  pages: true,
  num_of_copies: true,
  call_number: true,
  particulars: true,
})

const UpdateOrder = OrderFormSchema.omit({
  id: true,
  regd_no: true,
  print_type: true,
  file_pages: true,
  call_number: true,
  file: true,
})

export async function uploadOrderFile(
  regd_no: string,
  prevState: string | undefined,
  formData: FormData
) {
  const validatedFields = UploadOrder.safeParse({
    file: formData.get("file"),
    file_pages: formData.get("file_pages"),
  })

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors)
    return "Failed to place order. Invalid File"
  }
  const { file, file_pages } = validatedFields.data
  const filePath = `${process.cwd()}/photocopy/${regd_no}-${file.name}`

  if (validatedFields.data.file.size) {
    const formArray = new Int8Array(await file.arrayBuffer())
    fs.writeFile(filePath, formArray, function (err) {
      if (err) return console.error(err)
    })
  }

  let details
  try {
    details = await prisma.photocopy_register.create({
      data: {
        regd_no: regd_no,
        file: `/photocopy/${regd_no}-${file.name}`,
        file_pages: file_pages,
      },
    })
  } catch (err) {
    console.log(err)
    return "Already uploaded"
  }
  revalidatePath("/student/photocopy")
  redirect(`/student/photocopy/${details.id ?? ""}`)
}

export async function updateOrderDetails(
  order_id: number,
  prevState: string | undefined,
  formData: FormData
) {
  const validatedFields = UpdateOrder.safeParse({
    orientation: formData.get("orientation"),
    sides: formData.get("sides"),
    pages: formData.get("pages"),
    page_layout: formData.get("page_layout"),
    particulars: formData.get("particulars"),
    num_of_copies: formData.get("num_of_copies"),
  })

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors)
    return "Failed to edit Order"
  }

  const { orientation, sides, pages, page_layout, particulars, num_of_copies } =
    validatedFields.data

  console.log(validatedFields.data)
  // const cost =

  try {
    await prisma.photocopy_register.update({
      where: {
        id: order_id,
      },

      data: {
        orientation: orientation,
        sides: sides,
        pages: pages ?? undefined,
        page_layout: page_layout,
        particulars: particulars,
        num_of_copies: num_of_copies,
      },
    })
    console.log("Success!")
  } catch (err) {
    console.error("Update error", err)
    throw new Error("Failed to upload order")
  }
  revalidatePath("/student/photocopy")
  redirect(`/student/photocopy/${order_id ?? ""}`)
}

export async function deleteOrderWithId(order_id: number) {
  try {
    await prisma.photocopy_register.delete({
      where: {
        id: order_id,
      },
    })
  } catch (err) {
    console.error(err)
    throw new Error("Database Error: Failed to Delete Order")
  }
  revalidatePath("/student/photocopy")
  redirect("/student/photocopy")
}

export async function rejectOrderWithId(order_id: number) {
  try {
    await prisma.photocopy_register.update({
      where: {
        id: order_id,
      },
      data: {
        status: "REJECTED",
      },
    })
  } catch (err) {
    console.error(err)
    throw new Error("Database Error: Failed to Delete Order")
  }
  revalidatePath("/photocopy")
  redirect("/photocopy")
}

export async function printOrderWithId(order_id: number) {
  try {
    await prisma.photocopy_register.update({
      where: {
        id: order_id,
      },
      data: {
        status: "PRINTED",
      },
    })
  } catch (err) {
    console.error(err)
    throw new Error("Database Error: Failed to Print Order")
  }
  revalidatePath("/photocopy")
  redirect("/photocopy")
}
