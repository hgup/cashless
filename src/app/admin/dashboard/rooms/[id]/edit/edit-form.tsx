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
import { updateRoom } from "@/lib/actions"
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
import { Subs } from "@prisma/client"

const updateRoomSchema = z
  .object({
    room_leaderA: z.string({
      required_error: "You need to select atleast one room leader",
    }),
    room_leaderB: z.string().optional(),
    the_hindu: z.boolean().default(false).optional(),
    economic_times: z.boolean().default(false).optional(),
  })
  .refine(
    (schema) => {
      return !(schema.room_leaderA === schema.room_leaderB)
    },
    { message: "Please select different room leaders", path: ["room_leaderB"] }
  )

export type UpdateRoomFormSchema = z.infer<typeof updateRoomSchema>

// This can come from your database or API.

export default function UpdateRoomForm({ room }: { room: RoomWithRelations }) {
  const rl = room.room_leaders.map((leader) => leader.profile.regd_no)
  const rs = room.subscriptions
    ? room.subscriptions.map((sub) => sub.details.id)
    : []
  const defaultValues: Partial<UpdateRoomFormSchema> = {
    room_leaderA: rl[0],
    room_leaderB: rl[1],
    the_hindu: rs.includes(Subs.THE_HINDU),
    economic_times: rs.includes(Subs.ECONOMIC_TIMES),
  }
  const form = useForm<UpdateRoomFormSchema>({
    resolver: zodResolver(updateRoomSchema),
    defaultValues,
  })

  function onSubmit(data: UpdateRoomFormSchema) {
    updateRoom(data, room.room_no)
    toast({
      className: "text-lg",
      title: "Successfully updated Room Information",
    })
  }
  const memberLabels = room.members.map((member) => ({
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
          <h3 className="mb-4 text-lg font-medium">Room Members</h3>
          <div className="space-y-4">
            <FormLabel>Room Leaders </FormLabel>

            {/* Room Leader A */}
            <FormField
              control={form.control}
              name="room_leaderA"
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
                          <CommandEmpty>No student Found.</CommandEmpty>
                          <CommandGroup>
                            {memberLabels.map((mem) => (
                              <CommandItem
                                value={mem.label}
                                key={mem.value}
                                onSelect={() => {
                                  setOpenA((open) => !open)
                                  form.setValue("room_leaderA", mem.value)
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
                    {form.getValues("room_leaderA") ? (
                      <Button
                        onClick={() => {
                          form.resetField("room_leaderA")
                        }}
                        type="reset"
                        variant="ghost"
                        className="w-6 h-6 p-0 text-muted-foreground rounded-full"
                      >
                        <CrossCircledIcon />
                      </Button>
                    ) : null}
                  </div>
                  <FormDescription>Second Room Leader</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Room Leader B */}
            <FormField
              control={form.control}
              name="room_leaderB"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <div className="flex flex-row items-center gap-2">
                    <Popover open={openB}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            onClick={() => {
                              setOpenB((open) => !open)
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
                          <CommandEmpty>No Student found.</CommandEmpty>
                          <CommandGroup>
                            {memberLabels.map((mem) => (
                              <CommandItem
                                value={mem.label}
                                key={mem.value}
                                onSelect={() => {
                                  setOpenB((open) => !open)
                                  form.setValue("room_leaderB", mem.value)
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
                    {form.getValues("room_leaderB") ? (
                      <Button
                        onClick={() => {
                          form.resetField("room_leaderB")
                        }}
                        type="reset"
                        variant="ghost"
                        className="w-6 h-6 p-0 text-muted-foreground rounded-full"
                      >
                        <CrossCircledIcon />
                      </Button>
                    ) : null}
                  </div>
                  <FormDescription>Second Room Leader</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-medium">Subscriptions</h3>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="the_hindu"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">The Hindu</FormLabel>
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
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="economic_times"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Economic Times</FormLabel>
                    <FormDescription>
                      Receive emails about new products, features, and more.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex flex-row gap-2">
          <Button asChild variant="outline">
            <Link
              href={`/admin/dashboard/rooms?page=${
                "ABCS".indexOf(Array.from(room.room_no)[0]) + 1
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
