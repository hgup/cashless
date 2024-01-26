import {
  RoomWithRelations,
  SubscriptionWithDetails,
  fetchFilteredStudents,
  fetchRooms,
} from "@/lib/data"
import { formatCurrency } from "@/lib/utils"
import { UpdateRoom } from "./buttons"
import Image from "next/image"
import StudentAvatar from "@/components/student-avatar"
import { Room, subscription_details, subscriptions } from "@prisma/client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table"

function RoomAmount({ room }: { room: RoomWithRelations }) {
  let total = 0
  room.subscriptions?.forEach((sub) => {
    total += sub.details.amount
  })
  const perhead = total / room.members.length

  return (
    <div className="flex flex-row gap-1 items-center ">
      <span className="font-semibold">{formatCurrency(total)}</span>
      <span className="font-light text-muted-foreground text-sm">
        ({formatCurrency(perhead)}/h)
      </span>
    </div>
  )
}

export default async function StudentTable({
  query,
  currentPage,
}: {
  query: string
  currentPage: number
}) {
  const students = await fetchFilteredStudents(query, currentPage)
  const rooms = await fetchRooms(currentPage)

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg    p-2 md:pt-0">
          {/* MOBILE  */}
          <div className="md:hidden">
            {rooms?.map((room) => (
              <Card
                key={room.room_no}
                className="flex flex-col gap-2 p-5 mb-3 w-full"
              >
                <div className="flex flex-row justify-between items-baseline">
                  <h1 className="text-bold text-muted-foreground">
                    Room Leaders
                  </h1>
                  <Badge variant="secondary" className="text-lg w-min">
                    {room.room_no}
                  </Badge>
                </div>
                {room.room_leaders.map((leader) => (
                  <div
                    key={leader.regd_no}
                    className="flex flex-row gap-3 items-center "
                  >
                    <StudentAvatar
                      className="w-9 h-9"
                      name={leader.profile.name}
                      src={leader.profile.photo}
                    />
                    <p className="text-[17px]">{leader.profile.name}</p>
                  </div>
                ))}
                <h1 className="mt-2 text-bold text-muted-foreground">
                  Subscriptions
                </h1>
                <div className="flex flex-row  gap-2 pb-5 border-b">
                  {room.subscriptions.map((sub) => (
                    <Badge
                      key={`${sub.room_no}-${sub.type}`}
                      className="w-min"
                      variant="outline"
                    >
                      {sub.type}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-row items-center justify-between pt-2">
                  <RoomAmount room={room} />
                  <UpdateRoom id={room.room_no} />
                </div>
              </Card>
            ))}
          </div>

          {/* DESKTOP */}

          <Card>
            <Table className="hidden min-w-full md:table">
              <TableHeader className="border-b p-5">
                <TableRow>
                  <TableHead
                    scope="col"
                    className="px-3 py-5 font-semibold sm:pl-6"
                  >
                    <div>Room</div>
                  </TableHead>
                  <TableHead className="px-3 py-5">Room Leaders</TableHead>
                  <TableHead className="px-3 py-5">Subscriptions</TableHead>
                  <TableHead className="px-3 py-5">
                    Monthly Payment (per head)
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rooms?.map((room) => (
                  <TableRow
                    key={room.room_no}
                    className="text-lg py-5 h-[97px]"
                  >
                    <TableCell className="py-3 pl-6 pr-3">
                      <Badge variant="secondary" className="text-lg w-min">
                        {room.room_no}
                      </Badge>
                    </TableCell>
                    <TableCell className="flex flex-col gap-2 py-3 pl-6 pr-3">
                      {room.room_leaders.map((leader) => (
                        <div
                          key={leader.regd_no}
                          className="flex flex-row items-center gap-2"
                        >
                          <StudentAvatar
                            className="flex-col gap-2 w-9 h-9"
                            name={leader.profile.name}
                            src={leader.profile.photo}
                          />
                          <p className="text-[17px]">{leader.profile.name}</p>
                        </div>
                      ))}
                    </TableCell>
                    <TableCell className=" whitespace-nowrap px-3 py-3">
                      <div className="grid grid-cols-2 gap-4">
                        {room.subscriptions.map((sub) => (
                          <Badge
                            key={`${sub.room_no}-${sub.type}`}
                            className="w-min"
                            variant="outline"
                          >
                            {sub.type}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>

                    <TableCell className="whitespace-nowrap px-3 py-3">
                      <RoomAmount room={room} />
                    </TableCell>

                    <TableCell className="whitespace-nowrap px-3 py-3">
                      <div className="flex justify-end gap-3">
                        <UpdateRoom id={room.room_no} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              {/* <TableFooter></TableFooter> */}
            </Table>
          </Card>
        </div>
      </div>
    </div>
  )
}
export function RegdBadge({
  regd_no,
  className,
}: {
  regd_no: string
  className?: string
}) {
  return (
    <Badge variant="outline" className="h-min text-[14px]">
      <span>{regd_no}</span>
    </Badge>
  )
}
