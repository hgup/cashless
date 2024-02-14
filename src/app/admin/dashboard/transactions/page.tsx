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
      <div className="flex flex-col mb-4 pt-3 items-left gap-5 ">
        <h1 className={`font-bold text-xl md:text-2xl`}>Transactions</h1>
      </div>
      <div className="flex flex-col mx-2 mt-4 w-full items-right justify-between gap-3 md:mt-8">
        <Search className="w-full" placeholder="Search Transactions" />
        <SelectDate
          buttonClassName="h-12 w-full bg-secondary text-secondary-foreground"
          className="w-full text-muted-foreground lg:hidden"
        />
        {/* <CreateStudent /> */}
      </div>
      <Suspense
        key={query + currentPage}
        fallback={<TransactionTableSkeleton />}
      >
        <Table
          query={query}
          dateFrom={dateFrom}
          dateTo={dateTo}
          currentPage={currentPage}
          dept={"PHOTOCOPY"}
        />
      </Suspense>
      <div className="mt-4 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </main>
  )
}
