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
import Link from "next/link"

function RoomAmount({ room }: { room: RoomWithRelations }) {
  let total = 0
  room.subscriptions?.forEach((sub) => {
    total += sub.details.amount
  })
  const perhead = total / room.members.length

  return (
    <div className="flex flex-col  items-center ">
      <div className="font-semibold">{formatCurrency(total)}</div>
      <div className="text-muted-foreground text-[9px]">
        ({formatCurrency(perhead)}/h)
      </div>
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
        <div className="rounded-lg md:pt-0">
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
                  <Badge variant="secondary" className="w-min">
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
                    <p className="">{leader.profile.name}</p>
                  </div>
                ))}
                <h1 className="mt-2 text-bold text-muted-foreground">
                  Subscriptions
                </h1>
                <div className="flex flex-row  gap-2 pb-5 border-b">
                  {room.subscriptions.length ? (
                    room.subscriptions.map((sub) => (
                      <Badge
                        key={`${sub.room_no}-${sub.type}`}
                        className="w-min"
                        variant="outline"
                      >
                        {sub.type}
                      </Badge>
                    ))
                  ) : (
                    <span className="dark:text-neutral-700 text-neutral-400">
                      none
                    </span>
                  )}
                </div>
                <div className="flex flex-row items-center justify-between pt-2">
                  <RoomAmount room={room} />
                  <UpdateRoom id={room.room_no} />
                </div>
              </Card>
            ))}
          </div>

          {/* DESKTOP */}

          <Card className="hidden min-w-full md:table">
            <Table className="">
              <TableHeader className="border-b p-5 text-sm">
                <TableRow>
                  <TableHead scope="col" className="h-14 pl-6">
                    <div>Room</div>
                  </TableHead>
                  <TableHead className="text-right w-32">
                    Room Leaders
                  </TableHead>
                  <TableHead className="w-32"></TableHead>
                  <TableHead className="">Subscriptions</TableHead>
                  <TableHead className="text-xs text-center w-32">
                    Monthly Payment
                    <br />
                    (per head)
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rooms?.map((room) => (
                  <TableRow key={room.room_no} className="">
                    <TableCell className=" pl-6 mr-6 h-16">
                      <Badge variant="secondary" className="">
                        {room.room_no}
                      </Badge>
                    </TableCell>
                    {room.room_leaders.map((leader) => (
                      <TableCell key={leader.regd_no} className="">
                        <Link
                          href={`/admin/dashboard/users/${leader.regd_no}/edit`}
                          className="flex flex-row items-center gap-2 border rounded-full max-w-min dark:hover:text-black p-2 dark:hover:bg-neutral-200"
                        >
                          <StudentAvatar
                            className="flex-col gap-2 w-9 h-9"
                            name={leader.profile.name}
                            src={leader.profile.photo}
                          />
                          <div className="whitespace-nowrap pr-3">
                            {leader.profile.name.slice(0, 12) + "..."}
                          </div>
                        </Link>
                      </TableCell>
                    ))}
                    <FillCells num={2 - room.room_leaders.length} />

                    <TableCell className=" whitespace-nowrap px-3 py-3">
                      <div className="flex flex-col gap-1">
                        {room.subscriptions.map((sub) => (
                          <div
                            key={`${sub.room_no}-${sub.type}`}
                            className="w-min border rounded-sm text-[10px] px-1"
                          >
                            {sub.type.split("_").join(" ")}
                          </div>
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

function FillCells({ num }: { num: number }) {
  const cells = []
  for (let i = 0; i < num; i++) cells.push(<TableCell></TableCell>)

  return cells
}
