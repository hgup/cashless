"use client"

// import { CustomerField, InvoiceForm } from '@/app/lib/definitions';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { updateStudent } from "@/lib/actions"
import { useFormState } from "react-dom"
import { users } from "@prisma/client"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Select } from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useToast } from "@/components/ui/use-toast"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"

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

type StudentFormValues = z.infer<typeof FormSchema>

export default function UpdateStudentForm({ student }: { student: users }) {
  const defaultValues = student

  const { toast } = useToast()

  const form = useForm<StudentFormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  })

  async function onSubmit(data: StudentFormValues) {
    const name = data?.name
    console.log("hi")
    // await updateStudent(student.regd_no, data)
    toast({
      title: "Your todo has been created.",
    })

    form.reset()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-end gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full max-w-lg">
              <FormLabel>Create a New Todo</FormLabel>
              <FormControl>
                <Input placeholder="todo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
