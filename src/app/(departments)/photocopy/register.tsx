import Search from "@/components/search"
import Table from "./register-table"
// import { CreateStudent } from "./buttons"
import { Suspense } from "react"
import Pagination from "@/components/pagination"
import { fetchPhotocopyRegisterPages, fetchTransactionPages } from "@/lib/data"
import { TransactionTableSkeleton } from "@/components/dashboard/transactions/tableSkeletons"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import SelectDate from "@/components/dashboard/transactions/select-date"
import { Loader2 } from "lucide-react"
import useUrlParams from "@/lib/hooks/use-url-params"

export async function Register({
  searchParams,
  regd_no,
}: {
  searchParams?: {
    query?: string
    page?: string
    dateTo?: string
    dateFrom?: string
  }
  regd_no: string
}) {
  const query = searchParams?.query || ""
  const currentPage = Number(searchParams?.page) || 1
  const dateFrom = searchParams?.dateFrom || ""
  const dateTo = searchParams?.dateTo || ""

  const totalPages = await fetchPhotocopyRegisterPages(query, dateFrom, dateTo) // 12/6 = 2

  useUrlParams("t", "register")
  // console.log("QUERY:", query, currentPage, totalPages)
  return (
    <div className="h-full">
      <div className="flex flex-row items-center md:gap-2 ">
        <Search className="grow w-full" placeholder="Search Entries" />
        <SelectDate buttonClassName="h-12 hidden md:flex" />
      </div>
      <Suspense
        key={query + currentPage}
        fallback={
          <div className="flex w-full mt-4  min-h-[500px]">
            <Loader2 className="m-auto animate-spin h-10 w-10" />
          </div>
        }
      >
        <Table
          query={query}
          dept={"PHOTOCOPY"}
          dateFrom={dateFrom}
          dateTo={dateTo}
          currentPage={currentPage}
        />
      </Suspense>
      <div className="mt-4 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
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
