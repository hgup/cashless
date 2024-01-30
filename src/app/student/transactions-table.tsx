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
import { Dept } from "@prisma/client"
import { format } from "date-fns"
import { auth } from "@/auth"
import { TransactedAmount } from "@/components/transacted-amount"

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
  dept?: Dept
  currentPage: number
}) {
  const authdata = await auth()
  console.log(dateFrom, dateTo)
  if (authdata) {
    const transactions = await fetchFilteredTransactions(
      query,
      dateFrom,
      dateTo,
      currentPage,
      authdata.user.regd_no
    )

    return (
      <div className="mt-4 flow-root">
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
                      <Badge
                        className="w-16 align-center"
                        content="hi"
                        variant={"outline"}
                      >
                        {transaction.id}
                      </Badge>
                      <span>{format(transaction.date, "LLL dd, y")}</span>
                    </CardTitle>
                    <CardDescription className="text-right">
                      {transaction.particulars}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex  flex-row justify-between">
                    <Badge>{transaction.department}</Badge>
                    <span className="text-lg font-semibold">
                      <TransactedAmount amount={transaction.amount} />
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="hidden  min-w-full md:table">
              <Table>
                <TableHeader className="rounded-lg text-left text-sm font-normal">
                  <TableRow className="">
                    <TableHead
                      scope="col"
                      className="px-4 py-5 font-semibold sm:pl-6"
                    >
                      <span className="text-nowrap">TiD</span>
                    </TableHead>
                    <TableHead
                      scope="col"
                      className="px-3 py-5 font-medium sm:pl-6"
                    >
                      Particulars
                    </TableHead>
                    <TableHead
                      scope="col"
                      className="text-right px-3 py-5 font-medium"
                    >
                      Amount
                    </TableHead>
                    <TableHead
                      scope="col"
                      className="flex flex-row py-2 h-full px-3 justify-center items-center font-medium"
                    >
                      <SelectDate />
                    </TableHead>
                    <TableHead scope="col" className=" py-5 font-medium">
                      Department
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="">
                  {transactions?.map((transaction) => (
                    <TableRow
                      key={transaction.id}
                      className="w-full border-b py-2 text-sm  last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                    >
                      <TableCell className="whitespace-nowrap px-3 py-3">
                        <Badge variant="outline" className="text-md">
                          {transaction.id}
                        </Badge>
                      </TableCell>
                      <TableCell className="whitespace-nowrap px-3 py-3 ">
                        {transaction.particulars ? (
                          <span>{transaction.particulars}</span>
                        ) : (
                          <span className="text-muted-foreground">Empty</span>
                        )}
                      </TableCell>

                      <TableCell className="whitespace-nowrap px-3 py-3 text-right">
                        <TransactedAmount amount={transaction.amount} />
                      </TableCell>
                      <TableCell className="whitespace-nowrap px-3 py-3 text-center ">
                        {format(transaction.date, "LLL dd, y")}
                      </TableCell>
                      <TableCell className="whitespace-nowrap px-3 py-3 ">
                        <Badge>{transaction.department}</Badge>
                      </TableCell>

                      <TableCell className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex justify-end gap-3">
                          {/* <UpdateStudent id={student.regd_no} /> */}
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
