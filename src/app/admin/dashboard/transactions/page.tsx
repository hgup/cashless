import Search from "@/components/search"
import Table from "./table"
// import { CreateStudent } from "./buttons"
import { Suspense } from "react"
import { StudentsTableSkeleton } from "@/components/skeletons"
import Pagination from "@/components/pagination"
import { fetchTransactionPages } from "@/lib/data"
import { TransactionTableSkeleton } from "@/components/dashboard/transactions/tableSkeletons"
import SelectDate from "@/components/dashboard/transactions/select-date"

export default async function Page({
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

  const totalPages = await fetchTransactionPages(query, dateFrom, dateTo) // 12/6 = 2

  // console.log("QUERY:", query, currentPage, totalPages)
  return (
    <main>
      <div className="flex mb-4 flex-row items-center justify-between">
        <h1 className={`  text-xl md:text-2xl`}>Transactions</h1>
        <SelectDate className="text-muted-foreground md:hidden" />
      </div>
      <div className="mx-2 mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search Transactions" />
        {/* <CreateStudent /> */}
      </div>
      <Suspense
        key={query + currentPage}
        fallback={<TransactionTableSkeleton />}
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
    </main>
  )
}
