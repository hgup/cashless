import { fetchFilteredStudents, fetchFilteredTransactions } from "@/lib/data"
import { formatCurrency } from "@/lib/utils"
// import { UpdateStudent } from "./buttons"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import StudentAvatar from "@/components/student-avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import SelectDate from "@/components/dashboard/transactions/select-date"
import type { Dept } from "@prisma/client"
import { format } from "date-fns"
import { TransactedAmount } from "@/components/transacted-amount"
import RegdBadge from "@/components/dashboard/regd-badge"

export default async function TransactionsTable({
  query,
  dateFrom,
  dateTo,
  dept,
  currentPage,
}: {
  query: string
  dateFrom: string
  dateTo: string
  currentPage: number
  dept?: Dept
}) {
  const transactions = await fetchFilteredTransactions(
    query,
    dateFrom,
    dateTo,
    currentPage
  )

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg  md:pt-0">
          <div className="md:hidden">
            {transactions?.map((transaction) => (
              <Card
                key={transaction.id}
                // className="mb-2 w-full rounded-md dark:bg-stone-900 bg-white p-4"
                className="mb-2 p-2 w-full"
              >
                <CardHeader>
                  <CardTitle className="flex flex-row gap-2 justify-between items-center">
                    <div className="pl-2.5">
                      <Avatar className="w-12 h-12">
                        <AvatarImage
                          className="object-cover"
                          src={transaction.student.photo}
                        />
                        <AvatarFallback>
                          {transaction.student.name.split(" ").map((n) => n[0])}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    {format(transaction.date, "LLL dd, y")}
                  </CardTitle>
                  <div className="flex flex-row justify-between">
                    <RegdBadge
                      className="w-8 text-center"
                      regd_no={transaction.regd_no}
                    />
                    <div className="space-x-2 items-center text-right">
                      <Badge className="w-min" variant={"outline"}>
                        {transaction.id}
                      </Badge>
                      <span> {transaction.particulars}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex flex-row justify-between">
                  <Badge className="">{transaction.department}</Badge>
                  <span className="font-semibold">
                    <TransactedAmount amount={transaction.amount} />
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <Table className="hidden min-w-full md:table">
              <TableHeader className="rounded-lg text-left text-sm font-normal">
                <TableRow className="">
                  <TableHead
                    scope="col"
                    className="px-2 py-4 font-semibold sm:pl-6"
                  >
                    <span className="text-nowrap">TiD</span>
                  </TableHead>
                  <TableHead scope="col" className="font-medium sm:pl-6">
                    Student
                  </TableHead>
                  <TableHead scope="col" className="font-medium sm:pl-6 ">
                    Particulars
                  </TableHead>
                  <TableHead scope="col" className="font-medium">
                    Amount
                  </TableHead>
                  <TableHead
                    scope="col"
                    className="font-medium flex h-14 items-center justify-center"
                  >
                    {/* <SelectDate className="hidden lg:block" /> */}
                    <span className="">Date</span>
                  </TableHead>
                  <TableHead scope="col" className=" font-medium">
                    {/* Department */}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="">
                {transactions?.map((transaction) => (
                  <TableRow
                    key={transaction.id}
                    className="w-full border-b text-sm"
                  >
                    <TableCell className="flex flex-col h-16">
                      <Badge
                        variant="outline"
                        className="text-md rounded-full my-auto  w-full"
                      >
                        <span className="w-full text-center">
                          {transaction.id}
                        </span>
                      </Badge>
                    </TableCell>
                    <TableCell className=" whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-11 h-11">
                          <AvatarImage
                            className="object-cover"
                            src={transaction.student.photo}
                          />
                          <AvatarFallback>
                            {transaction.student.name
                              .split(" ")
                              .map((n) => n[0])}
                          </AvatarFallback>
                        </Avatar>
                        <div className="md:hidden lg:flex">
                          <RegdBadge regd_no={transaction.regd_no} />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="whitespace-nowrap dark:text-neutral-400 text-neutral-700 ">
                      {transaction.particulars}
                    </TableCell>

                    <TableCell className="whitespace-nowrap">
                      <TransactedAmount amount={transaction.amount} />
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-center ">
                      {format(transaction.date, "LLL dd, y")}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <Badge variant="outline">{transaction.department}</Badge>
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
