"use client"

import * as React from "react"

import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { room_numbers } from "@/lib/constants"

type Room = {
  value: string
  label: string
}

const rooms: Room[] = room_numbers.map((point) => {
  return {
    value: point,
    label: point,
  }
})

export function SelectRoom({ value }: { value: string }) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [selectedRoom, setSelectedRoom] = React.useState<Room | null>({
    label: value,
    value: value,
  })

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start">
            {selectedRoom ? <>{selectedRoom.label}</> : <>+ Set Room</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <RoomList
            setOpen={setOpen}
            setSelectedRoom={setSelectedRoom}
            rooms={rooms}
          />
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-[150px] justify-start">
          {selectedRoom ? <>{selectedRoom.label}</> : <>+ Set Room</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <RoomList
            setOpen={setOpen}
            setSelectedRoom={setSelectedRoom}
            rooms={rooms}
          />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function RoomList({
  setOpen,
  setSelectedRoom,
  rooms,
}: {
  setOpen: (open: boolean) => void
  setSelectedRoom: (rooms: Room | null) => void
  rooms: Room[]
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter Rooms..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {rooms.map((room) => (
            <CommandItem
              key={room.value}
              value={room.value}
              onSelect={(value) => {
                setSelectedRoom(
                  rooms.find((room) => room.value === value.toUpperCase()) ||
                    null
                )
                setOpen(false)
              }}
            >
              {room.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
