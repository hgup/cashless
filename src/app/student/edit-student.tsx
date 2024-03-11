"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useFormStatus } from "react-dom"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"
import { users } from "@prisma/client"
import { Input } from "@/components/ui/input"
import { updateStudentUser } from "@/lib/actions"
import React from "react"
import { CommandItem } from "@/components/ui/command"
import { Loader2, SettingsIcon } from "lucide-react"

// CREATE SCHEMA
const updateUserSchema = z
  .object({
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
    allowTransactions: z.boolean().default(false),
  })
  .refine(
    (schema) => {
      if (Number.isNaN(Number(schema.password))) return false
      if (0 <= Number(schema.password) && Number(schema.password) <= 9999) {
        return true
      }
      return false
    },
    { message: "Password has to be a 4 digit number", path: ["password"] }
  )
  .refine(
    (schema) => {
      if (schema.password) {
        if (schema.confirmPassword) return true
        else return false
      } else return true
    },
    { message: "Please confirm your password", path: ["confirmPassword"] }
  )
  .refine(
    (schema) => {
      if (schema.password && schema.confirmPassword) {
        if (schema.password === schema.confirmPassword) {
          return true
        }
      } else return true
    },
    {
      message: "Passwords Should Match",
      path: ["confirmPassword"],
    }
  )

// GET TYPE use in the action
export type UpdateUserFormSchema = z.infer<typeof updateUserSchema>

// get `room` from database in `Page.tsx` for default values
export default function SettingsForm({
  student,
  open,
  setOpen,
}: {
  student: users
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const defaultValues: Partial<UpdateUserFormSchema> = {
    allowTransactions: false,
  }
  const form = useForm<UpdateUserFormSchema>({
    resolver: zodResolver(updateUserSchema),
    defaultValues,
  })

  const [pending, setPending] = React.useState(false)
  const [changed, setChanged] = React.useState(false)

  async function onSubmit(data: UpdateUserFormSchema) {
    // react-dom.development.js:8585  Uncaught Error: Only plain objects,
    // and a few built-ins, can be passed to Server Actions.
    //  Classes or null prototypes are not supported.
    setPending(true)
    await updateStudentUser(data, student.regd_no)
    let p = document.getElementById("pass") as HTMLInputElement
    if (p) {
      p.value = ""
    }
    p = document.getElementById("confpass") as HTMLInputElement
    if (p) {
      p.value = ""
    }
    setChanged(false)
    toast({
      className: "text-lg  dark:text-green-500",
      title: "Success",
      description: "Changed student details successfully",
    })
    setPending(false)
  }

  const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false)

  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <DialogTrigger asChild>
        <Button className="w-full  justify-start" variant="ghost">
          <SettingsIcon className="mr-2 h-4 w-4" />{" "}
          <span>Profile Settings</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>Settings</DialogTitle>
              <DialogDescription>Edit your Profile settings</DialogDescription>
            </DialogHeader>
            <div>
              <div className="space-y-4">
                <div className="mb-5"></div>

                <FormLabel className="text-md">Change your Passcode </FormLabel>

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Passcode</FormLabel>
                      <FormControl>
                        <Input
                          id="pass"
                          type="password"
                          className="max-w-72"
                          defaultValue={field.value}
                          placeholder="Enter new Password"
                          onChange={(e) => {
                            setChanged(true)
                            field.onChange(e)
                          }}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Confirm Password */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <div className="space-y-0 5">
                        <FormLabel className="text-base">
                          Confirm Password
                        </FormLabel>
                      </div>
                      <FormControl>
                        <Input
                          id="confpass"
                          type="password"
                          placeholder="re-enter your password"
                          className="max-w-72"
                          defaultValue={field.value}
                          onChange={(e) => {
                            setChanged(true)
                            field.onChange(e)
                          }}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="mt-2">
              <h3 className="mb-4 text-lg font-medium">Payments Info</h3>
              <div className="space-y-4">
                {/* Switch */}
                <FormField
                  control={form.control}
                  name="allowTransactions"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Allow Quick Transactions
                        </FormLabel>
                        <FormDescription>
                          {
                            "In case you don't want password prompt while making payments for convenience"
                          }
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="reset"
                variant="outline"
                onClick={() => setShowNewTeamDialog(false)}
              >
                Cancel
              </Button>
              <UpdateButton pending={pending} changed={changed} />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

function UpdateButton({
  pending,
  changed,
}: {
  pending: boolean
  changed: boolean
}) {
  return (
    <Button disabled={pending || !changed}>
      {pending ? (
        <span className="flex items-center">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {"Updating"}
        </span>
      ) : (
        <span>Update</span>
      )}
    </Button>
  )
}
