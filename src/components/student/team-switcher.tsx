"use client"

import * as React from "react"
import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { redirect, usePathname } from "next/navigation"
import Link from "next/link"
import clsx from "clsx"
import { PrinterIcon, User2, UserCheck2 } from "lucide-react"

const groups = [
  {
    label: "Personal Account",
    teams: [
      {
        label: "Student",
        value: "/student",
        Logo: UserCheck2,
      },
    ],
  },
  {
    label: "Teams",
    teams: [
      {
        label: "Photocopy",
        value: "/photocopy",
        Logo: PrinterIcon,
      },
    ],
  },
]

const getTeam = (pathname: string): Team => {
  let t: { label: string; value: string; Logo: any } | null = groups[0].teams[0]
  groups[1].teams.forEach((team) => {
    if (pathname.startsWith(team.value)) {
      t = team
    }
  })

  return t
}

type Team = (typeof groups)[number]["teams"][number]

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface TeamSwitcherProps extends PopoverTriggerProps {}

export default function TeamSwitcher({ className }: TeamSwitcherProps) {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()
  const [selectedTeam, setSelectedTeam] = React.useState<Team>(
    getTeam(pathname)
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a team"
          className={clsx(
            cn(
              "w-min justify-between rounded-2xl md:ml-2 flex flex-row gap-2 items-center",
              className
            )
          )}
        >
          <selectedTeam.Logo className="w-5 h-5 text-muted-foreground md:text-foreground" />
          <span className="hidden md:flex">{selectedTeam.label}</span>
          <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[200px] rounded-2xl p-1">
        <Command className="rounded-2xl">
          <CommandList>
            {/* <CommandInput placeholder="Search team..." /> */}
            {/* <CommandEmpty>No team found.</CommandEmpty> */}
            {groups.map((group) => (
              <CommandGroup key={group.label} heading={group.label}>
                {group.teams.map((team) => (
                  <Link key={team.value} href={team.value}>
                    <CommandItem
                      onSelect={() => {
                        setSelectedTeam(team)
                        setOpen(false)
                      }}
                      className="text h-10 rounded-2xl"
                    >
                      {team.label}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedTeam.value === team.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  </Link>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
