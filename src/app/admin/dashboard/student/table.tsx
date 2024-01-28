import { fetchFilteredStudents } from "@/lib/data"
import { formatCurrency } from "@/lib/utils"
import { UpdateStudent } from "./buttons"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import StudentAvatar from "@/components/student-avatar"
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

export default async function StudentTable({
  query,
  currentPage,
}: {
  query: string
  currentPage: number
}) {
  const students = await fetchFilteredStudents(query, currentPage)

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg  p-2 md:pt-0">
          <div className="md:hidden">
            {students?.map((student) => (
              <Card
                key={student.regd_no}
                // className="mb-2 w-full rounded-md dark:bg-stone-900 bg-white p-4"
                className="mb-2 p-5 w-full"
              >
                <div className="flex items-center justify-between border-b pb-4 w-full">
                  <div className="w-full">
                    <div className="flex flex-row justify-between w-full">
                      <div className="mb-2 flex items-center gap-5">
                        <StudentAvatar
                          src={student.photo}
                          className="w-16 h-16"
                          name={student.name}
                        />
                        <div className="flex flex-col">
                          <p className="text-semibold text-[20px]">
                            {student.name}
                          </p>
                          <p className="text-md text-muted-foreground">
                            {student.class}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-5 items-end">
                        <RegdBadge regd_no={student.regd_no} />
                        <Badge
                          variant="secondary"
                          className="text-center w-min text-md"
                        >
                          {student.room_no}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(student.balance)}
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateStudent id={student.regd_no} />
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <Card>
            <Table className="hidden min-w-full md:table">
              <TableHeader className="rounded-lg text-left text-sm font-normal">
                <TableRow className="">
                  <TableHead
                    scope="col"
                    className="px-4 py-5 font-semibold sm:pl-6"
                  >
                    <span className="text-nowrap">Regd #</span>
                  </TableHead>
                  <TableHead
                    scope="col"
                    className="px-3 py-5 font-medium sm:pl-6"
                  >
                    Student
                  </TableHead>
                  <TableHead scope="col" className="px-3 py-5 font-medium">
                    Room
                  </TableHead>
                  <TableHead scope="col" className="px-3 py-5 font-medium">
                    Class
                  </TableHead>
                  <TableHead scope="col" className="px-3 py-5 font-medium">
                    Balance
                  </TableHead>
                  <TableHead scope="col" className="relative py-3 pl-6 pr-3">
                    <span className="sr-only">Edit</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="">
                {students?.map((student) => (
                  <TableRow
                    key={student.regd_no}
                    className="w-full border-b py-2 text-sm  last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <TableCell className="whitespace-nowrap px-3 py-3">
                      <RegdBadge regd_no={student.regd_no} />
                    </TableCell>

                    <TableCell className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage
                            className="object-cover"
                            src={student.photo}
                          />
                          <AvatarFallback>
                            {student.name.split(" ").map((n) => n[0])}
                          </AvatarFallback>
                        </Avatar>
                        <p className="text-[17px]">{student.name}</p>
                      </div>
                    </TableCell>
                    <TableCell className="whitespace-nowrap px-3 py-3">
                      <Badge variant="secondary" className="text-md">
                        {student.room_no}
                      </Badge>
                    </TableCell>
                    <TableCell className="whitespace-nowrap px-3 py-3 ">
                      {student.class}
                    </TableCell>
                    <TableCell className="whitespace-nowrap px-3 py-3">
                      {formatCurrency(student.balance)}
                    </TableCell>
                    <TableCell className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        <UpdateStudent id={student.regd_no} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
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
