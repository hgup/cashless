"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import type { RoomWithRelations } from "@/lib/data"

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
import { Input } from "@/components/ui/input"

// import {action} from "@/lib/actions"

// CREATE SCHEMA
const formSchema = z
  .object({
    field1: z.string({ required_error: "Some Error" }),
    field2: z.string().optional(),
    field3: z.boolean().default(false).optional(),
  })
  .refine(
    (schema) => {
      if (schema.field1 === "Hello" && schema.field2 === "Namaste") return false
    },
    { message: "hi", path: ["field1", "field2"] }
  )

// GET TYPE use in the action
export type Schema = z.infer<typeof formSchema>

// get `room` from database in `Page.tsx` for default values
export default function UpdateSettingsForm({ student }: { student: users }) {
  //   const rl = student.room.room_leaders.map((leader) => leader.profile.regd_no)
  //   const rs = student.room.subscriptions
  //     ? room.subscriptions.map((sub) => sub.details.id)
  //     : []
  const defaultValues: Partial<Schema> = {
    field1: "",
    field2: "",
    field3: false,
  }
  const form = useForm<Schema>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  function onSubmit(data: Schema) {
    // action(data, room.room_no)
    toast({
      className: "text-lg",
      title: "Success",
      description: "Created...",
    })
  }
  const memberLabels = [student].map((member) => ({
    value: member.regd_no,
    label: member.name,
    extra: member.class,
  }))
  const [openA, setOpenA] = useState(false)
  const [openB, setOpenB] = useState(false)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <FormLabel>Input Box </FormLabel>
          <FormField
            control={form.control}
            name="field2"
            render={({ field }) => (
              <FormItem>
                <div className="space-y-0 5">
                  <FormLabel className="text-base">Input</FormLabel>
                  <FormDescription>Input text here</FormDescription>
                </div>
                <FormControl>
                  <Input defaultValue={field.value} onChange={field.onChange} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <h3 className="mb-4 text-lg font-medium">Room Members</h3>
          <div className="space-y-4">
            <FormLabel>Room Leaders </FormLabel>

            {/* Drop down search combo box */}
            <FormField
              control={form.control}
              name="field1"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <div className="flex flex-row items-center gap-2">
                    <Popover open={openA}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            onClick={() => {
                              setOpenA((open) => !open)
                            }}
                            className={cn(
                              "w-[350px] justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? memberLabels.find(
                                  (mem) => mem.value === field.value
                                )?.label
                              : "Select Student"}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[350px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search Student..."
                            className="h-9"
                          />
                          <CommandEmpty>No framework found.</CommandEmpty>
                          <CommandGroup>
                            <CommandItem
                              value={"Hi"}
                              key={"hi"}
                              onSelect={() => {
                                setOpenA((open) => !open)
                                form.setValue("field1", "hi")
                              }}
                            >
                              <div className="flex flex-row justify-between w-full">
                                <span>{"hi"}</span>
                                <Badge variant="outline">{"lol"}</Badge>
                              </div>
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  "hi" === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                            {memberLabels.map((mem) => (
                              <CommandItem
                                value={mem.label}
                                key={mem.value}
                                onSelect={() => {
                                  setOpenA((open) => !open)
                                  form.setValue("field1", mem.value)
                                }}
                              >
                                <div className="flex flex-row justify-between w-full">
                                  <span>{mem.label}</span>
                                  <Badge variant="outline">{mem.extra}</Badge>
                                </div>
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    mem.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    {/* Cancel Selection */}
                    {form.getValues("field1") ? (
                      <Button
                        onClick={() => {
                          form.resetField("field1")
                        }}
                        type="reset"
                        variant="ghost"
                        className="w-6 h-6 p-0 text-muted-foreground rounded-full"
                      >
                        <CrossCircledIcon />
                      </Button>
                    ) : null}
                  </div>
                  <FormDescription>First thing</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-medium">Subscriptions</h3>
          <div className="space-y-4">
            {/* Switch */}
            <FormField
              control={form.control}
              name="field3"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      You turn me on like a light switch
                    </FormLabel>
                    <FormDescription>
                      Receive emails about your account activity.
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
            <Link
              href={`/admin/dashboard/rooms?page=${
                "ABCS".indexOf(student.room_no ?? "A") + 1
              }`}
            >
              Cancel
            </Link>
          </Button>
          <Button type="submit">Update Room Info</Button>
        </div>
      </form>
    </Form>
  )
}
