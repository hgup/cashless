"use client"
import { signOut } from "@/auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ArrowLeftRight, Home, SettingsIcon, User } from "lucide-react"
import Link from "next/link"
import { ThemeModeSwitch } from "./theme-switch"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Separator } from "./ui/separator"
import { RunAction } from "./run-action"
import { signOutAction } from "@/lib/actions"

export function UserNav() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 w-8 md:h-14 md:w-14 rounded-full"
        >
          <Avatar className="h-9 w-9 md:h-14 md:w-14 border-2 border-stone-400">
            <AvatarImage src="https://github.com/hgup.png" alt="@hgup" />
            <AvatarFallback>HG</AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56" align="end" forceMount>
        <div className="font-normal">
          <div className="flex flex-row items-center justify-between pb-3">
            <p className="font-medium leading-none">Hursh Gupta</p>
            <Badge className="w-min" variant="outline">
              211219
            </Badge>
          </div>
        </div>
        <Separator />
        <div>
          <div className="py-2">
            <Button asChild className="w-full justify-start" variant="ghost">
              <Link href="/admin/dashboard/settings">
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
