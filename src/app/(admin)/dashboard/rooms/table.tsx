import { fetchFilteredStudents, fetchRooms } from "@/lib/data"
import { formatCurrency } from "@/lib/utils"
import { UpdateRoom } from "./buttons"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import StudentAvatar from "@/components/student-avatar"

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
        <div className="rounded-lg  bg-gray-50 dark:bg-black p-2 md:pt-0">
          {/* MOBILE  */}
          <div className="md:hidden">
            {rooms?.map((room) => (
              <Card
                key={room.room_no}
                className="flex flex-col gap-2 p-5 mb-2 w-full"
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
                  <div className="flex flex-row gap-3 items-center ">
                    <StudentAvatar
                      className="w-9 h-9"
                      name={leader.profile.name}
                      src={leader.profile.photo}
                    />
                    <p className="text-[17px]">{leader.profile.name}</p>
                  </div>
                ))}
                <h1 className="text-bold text-muted-foreground">
                  Subscriptions
                </h1>
              </Card>
            ))}
          </div>
          {/* DESKTOP */}
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr className="dark:text-stone-400">
                <th scope="col" className="px-4 py-5 font-semibold sm:pl-6">
                  Room
                </th>
                <th scope="col" className="px-3 py-5 font-medium sm:pl-6">
                  Room Leaders
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Subscriptions
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Pending?
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Monthly Payment (per head)
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-stone-900 dark:text-white">
              {rooms?.map((room) => (
                <tr
                  key={room.room_no}
                  className="w-full border-b py-2 text-sm hover:bg-stone-100 dark:hover:bg-stone-800 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap pl-10 px-3 py-3">
                    <Badge
                      variant="secondary"
                      className="text-md w-12 text-center"
                    >
                      {room.room_no}
                    </Badge>
                  </td>

                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      {/* <p className="text-[17px]">{student.name}</p> */}
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-3 py-3">
                    <Badge variant="secondary" className="text-md">
                      {/* {student.room_no} */}
                    </Badge>
                  </td>

                  <td className="whitespace-nowrap px-3 py-3 ">
                    {/* {student.class} */}
                  </td>

                  <td className="whitespace-nowrap px-3 py-3">
                    {/* {formatCurrency(student.balance)} */}
                  </td>

                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateRoom id={room.room_no} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
