"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { SettingsIcon } from "lucide-react"
import Link from "next/link"
import { ThemeModeSwitch } from "./theme-switch"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Separator } from "./ui/separator"
import { RunAction } from "./run-action"
import { signOutAction } from "@/lib/actions"
import React from "react"
import { users } from "@prisma/client"
import { User } from "next-auth"

export function UserNav({ user }: { user: User }) {
  // console.log(user)
  const [open, setOpen] = React.useState(false)
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 w-8 md:h-14 md:w-14 rounded-full"
        >
          <Avatar className="h-12 w-12 md:h-12 md:w-12 border-2 border-stone-400">
            <AvatarImage
              className="object-cover"
              src={user?.picture ?? ""}
              alt={user?.name ?? ""}
            />
            <AvatarFallback>
              {user?.name?.split(" ").map((n) => n[0])}
            </AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" className="w-56" align="start" forceMount>
        <div className="font-normal">
          <div className="flex flex-row items-center justify-between pb-3">
            <p className="font-medium leading-none">{user?.name}</p>
            <Badge className="w-min" variant="outline">
              {user?.regd_no}
            </Badge>
          </div>
        </div>
        <Separator />
        <div>
          <div className="py-2">
            <Button asChild className="w-full justify-start" variant="ghost">
              <Link href="/settings">
                <SettingsIcon className="mr-2 h-4 w-4" /> Profile Settings
              </Link>
            </Button>
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
