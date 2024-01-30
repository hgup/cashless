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
import SelectDate from "@/components/dashboard/transactions/select-date"

export function TransactionTableSkeleton() {
  return (
    <div className="mt-4 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg  md:pt-0">
          <Card>
            <Table className="hidden min-w-full md:table">
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
                  <TableHead scope="col" className="px-3 py-5 font-medium">
                    Amount
                  </TableHead>
                  <TableHead scope="col" className="px-3 py-5 font-medium">
                    <SelectDate />
                  </TableHead>
                  <TableHead scope="col" className=" py-5 font-medium">
                    Department
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="">
                {"abcdefghij".split("").map((val) => (
                  <TableRow
                    key={val}
                    className="w-full border-b py-2 text-sm  last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <TableCell className="whitespace-nowrap px-3 py-3">
                      <Skeleton className="w-8 h-6" />
                    </TableCell>
                    <TableCell className="whitespace-nowrap px-3 py-3 ">
                      <Skeleton className="w-60 h-8 " />
                    </TableCell>

                    <TableCell className="whitespace-nowrap px-3 py-3">
                      <Skeleton className="w-32 h-10 " />
                    </TableCell>
                    <TableCell className="whitespace-nowrap px-3 py-3 ">
                      <Skeleton className="w-32 h-10 " />
                    </TableCell>
                    <TableCell className="whitespace-nowrap px-3 py-3 ">
                      <Skeleton className="w-24 h-12 " />
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
