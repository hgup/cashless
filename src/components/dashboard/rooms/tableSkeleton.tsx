import { Skeleton } from "@/components/ui/skeleton"
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

export function RoomTableSkelly() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg    p-2 md:pt-0">
          <Card className="hidden md:flex">
            <Table className="min-w-full">
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
                {"abcdefgh".split("").map((room) => (
                  <TableRow key={room} className="text-lg py-5 h-[97px]">
                    <TableCell className="py-3 pl-6 pr-3">
                      <Skeleton className="w-16 h-10" />
                    </TableCell>
                    <TableCell className="flex flex-col gap-2 py-3 pl-6 pr-3">
                      <div className="flex flex-row gap-2 items-center ">
                        <Skeleton className="w-9 h-9 rounded-full"></Skeleton>
                        <Skeleton className="w-72 h-8" />
                      </div>
                      <div className="flex flex-row gap-3 items-center ">
                        <Skeleton className="w-9 h-9 rounded-full"></Skeleton>
                        <Skeleton className="w-52 h-8 text-transparent"></Skeleton>
                      </div>
                    </TableCell>
                    <TableCell className="">
                      <div className="grid grid-cols-3 w-80">
                        {"ABCDE".split("").map((sub) => (
                          <Skeleton
                            key={`${sub}`}
                            className="w-[96px] h-7 mt-3"
                          ></Skeleton>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Skeleton className="w-16 h-6" />
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
