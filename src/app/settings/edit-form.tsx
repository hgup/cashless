"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import type { RoomWithRelations } from "@/lib/data"
import ProfilePic from "@/components/profile-pic"

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { useState } from "react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CaretSortIcon, CrossCircledIcon } from "@radix-ui/react-icons"
import {
  Command,
  CommandInput,
  CommandItem,
  CommandEmpty,
  CommandGroup,
} from "@/components/ui/command"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { CheckIcon } from "@heroicons/react/24/outline"
import { User } from "next-auth"
import { users } from "@prisma/client"

import { MAX_FILE_SIZE, ACCEPTED_IMAGE_TYPES } from "@/lib/config"
import { Input } from "@/components/ui/input"

import { updateUser } from "@/lib/actions"

// CREATE SCHEMA
const updateUserSchema = z
  .object({
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
    allowTransactions: z.boolean().default(false),
  })
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
export default function UpdateSettingsForm({ student }: { student: users }) {
  const defaultValues: Partial<UpdateUserFormSchema> = {
    allowTransactions: false,
  }
  const form = useForm<UpdateUserFormSchema>({
    resolver: zodResolver(updateUserSchema),
    defaultValues,
  })

  async function onSubmit(data: UpdateUserFormSchema) {
    // react-dom.development.js:8585  Uncaught Error: Only plain objects,
    // and a few built-ins, can be passed to Server Actions.
    //  Classes or null prototypes are not supported.
    await updateUser(data, student.regd_no)
    toast({
      className: "text-lg",
      title: "Success",
      description: "Changed user details successfully",
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <h3 className="mb-4 text-lg font-medium">User Info</h3>
          <div className="space-y-4">
            <div className="mb-5">
              {/* <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="">
                    <div className="flex flex-row gap-10">
                      <div className="space-y-0.5 flex-grow">
                        <FormLabel className="text-base">
                          Profile Picture
                        </FormLabel>
                        <FormDescription>Select Your Avatar</FormDescription>
                      </div>

                      <Button type="button" onClick={resetImage}>
                        Reset
                      </Button>
                    </div>
                    <div className="flex flex-row gap-5 items-center">
                      <ProfilePic
                        preview={preview}
                        name={student.name}
                        handleChangeImage={handleChangeImage}
                      />
                      <FormControl>
                        <Input
                          className="h-20 max-w-72"
                          type="file"
                          defaultValue={field.value}
                          onChange={(e) => {
                            // handleChangeImage(e)
                            form.setValue(
                              "image",
                              e.target.files[0] ?? undefined
                            )
                          }}
                        />
                      </FormControl>

                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              /> */}
            </div>

            <FormLabel className="text-md">Change your Password </FormLabel>

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="max-w-72"
                      defaultValue={field.value}
                      placeholder="Enter your Password"
                      onChange={field.onChange}
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
                      type="password"
                      placeholder="re-enter your password"
                      className="max-w-72"
                      defaultValue={field.value}
                      onChange={field.onChange}
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

        <div className="flex flex-row gap-2">
          <Button asChild variant="outline">
            <Link href={`/login`}>Cancel</Link>
          </Button>
          <Button type="submit">Update</Button>
        </div>
      </form>
    </Form>
  )
}
