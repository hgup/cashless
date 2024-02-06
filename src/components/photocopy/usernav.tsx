"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { SettingsIcon } from "lucide-react"
import Link from "next/link"
import { ThemeModeSwitch } from "@/components/theme-switch"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { RunAction } from "@/components/run-action"
import { signOutAction } from "@/lib/actions"
import { User } from "next-auth"
import React from "react"
import SettingsForm from "@/app/student/edit-student"
import { users } from "@prisma/client"

export function UserNav({ student }: { student: users }) {
  // console.log(user)
  const [open, setOpen] = React.useState(false)
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 md:h-12 md:w-12 rounded-full"
        >
          <Avatar className="h-10 w-10 md:h-12 md:w-12 border-2 border-stone-400">
            <AvatarImage
              className="object-cover"
              src={student?.photo ?? ""}
              alt={student?.name ?? ""}
            />
            <AvatarFallback>
              {student?.name?.split(" ").map((n) => n[0])}
            </AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        className="w-56 mt-1"
        align="start"
        forceMount
      >
        <div className="font-normal">
          <div className="flex flex-row items-center justify-between pb-3">
            <p className="font-medium leading-none">{student?.name}</p>
            <Badge className="w-min" variant="outline">
              {student?.regd_no}
            </Badge>
          </div>
        </div>
        <Separator />
        <div>
          <div className="py-2">
            <SettingsForm student={student} open={open} setOpen={setOpen} />
          </div>
          <div className="py-2">
            <div className="flex flex-row justify-between">
              <p>Dark Mode</p>
              <ThemeModeSwitch />
            </div>
          </div>
        </div>
        <Separator />
        <div className="flex flex-row justify-between py-2 items-center">
          <form
            className=""
            action={async () => {
              await signOutAction()
            }}
          >
            <Button
              className="flex flex-row justify-between hover:text-red-400"
              variant="outline"
            >
              Sign Out
            </Button>
          </form>
          <RunAction />
        </div>
      </PopoverContent>
    </Popover>
  )
}
