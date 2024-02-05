import Search from "@/components/search"
import Table from "./register-table"
// import { CreateStudent } from "./buttons"
import { Suspense } from "react"
import { StudentsTableSkeleton } from "@/components/skeletons"
import Pagination from "@/components/pagination"
import {
  fetchFilteredRegisterEntries,
  fetchPhotocopyRegisterPages,
  fetchTransactionPages,
} from "@/lib/data"
import { TransactionTableSkeleton } from "@/components/dashboard/transactions/tableSkeletons"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import SelectDate from "@/components/dashboard/transactions/select-date"
import { Dept } from "@prisma/client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { rejectOrderWithId } from "@/lib/actions"
import { Ban } from "lucide-react"
import clsx from "clsx"
import { usePathname } from "next/navigation"
import { Badge } from "@/components/ui/badge"

export default async function Pending({
  searchParams,
}: {
  searchParams?: {
    query?: string
    page?: string
    dateTo?: string
    dateFrom?: string
  }
}) {
  const query = searchParams?.query || ""
  const currentPage = Number(searchParams?.page) || 1
  const dateFrom = searchParams?.dateFrom || ""
  const dateTo = searchParams?.dateTo || ""

  const totalPages = await fetchPhotocopyRegisterPages(
    query,
    dateFrom,
    dateTo,
    "PENDING"
  ) // 12/6 = 2

  // console.log("QUERY:", query, currentPage, totalPages)
  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-3">
        <div className="flex col-span-1 row-start-1 flex-col items-center gap-2 ">
          <Search className="grow w-full mb-4" placeholder="Search Entries" />
        </div>
        <div className="col-span-1 row-start-2">
          <Suspense key={query + currentPage} fallback={<span>Loading</span>}>
            <PendingOrders
              query={query}
              dept={"PHOTOCOPY"}
              dateFrom={dateFrom}
              dateTo={dateTo}
              currentPage={currentPage}
            />
          </Suspense>
        </div>
        <div className="mt-4 row-start-3 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  )
}

async function PendingOrders({
  query,
  dateFrom,
  dateTo,
  currentPage,
}: {
  query: string
  dateFrom: string
  dateTo: string
  dept?: Dept
  currentPage: number
}) {
  const orders = await fetchFilteredRegisterEntries(
    query,
    dateFrom,
    dateTo,
    currentPage,
    "PENDING"
  )
  return (
    <div className="flex flex-col gap-2">
      {orders.map((order) => (
        <div
          key={order.id}
          className="flex flex-row gap-2 justify-between items-center"
        >
          <button className="flex-grow ">
            <Card
              className={
                "flex flex-row items-center hover:bg-primary hover:text-primary-foreground"
              }
            >
              <CardHeader className="">
                <CardTitle className="flex text-right flex-row gap-2 justify-between">
                  <Badge variant="secondary">{order.id}</Badge>
                  <span>{order.file.split("/").pop()?.split("-").pop()}</span>
                </CardTitle>
              </CardHeader>
              <CardDescription></CardDescription>

              <form
                key={order.id}
                action={async () => {
                  "use server"
                  await rejectOrderWithId(order.id)
                }}
              >
                <Button
                  className="rounded-full mr-4 w-12 h-12 text-red-400 hover:bg-red-500 hover:text-white"
                  variant={"outline"}
                >
                  <Ban className="" />
                </Button>
              </form>
            </Card>
          </button>
        </div>
      ))}
    </div>
  )
}

export function PendingTransactions() {
  const pending: any = undefined
  return (
    <Card className=" space-y-4">
      <CardHeader>
        <CardTitle className="text-center font-bold text-xl">
          Pending Transactions
        </CardTitle>
        <CardDescription className="text-center">
          Approve Transactions here
        </CardDescription>
      </CardHeader>

      <CardContent className="pl-2 flex flex-col items-center">
        <span className="text-muted-foreground text-center w-full text-s">
          No pending transactions
        </span>
      </CardContent>
    </Card>
  )
}
