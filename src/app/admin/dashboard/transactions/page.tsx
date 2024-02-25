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
    <main className="relative h-[900px]">
      <div className="flex flex-col mb-6 pt-3 items-left gap-5 ">
        <h1 className={`font-bold text-2xl md:text-2xl  text-neutral-700`}>
          Transactions
        </h1>
      </div>
      <div className="flex flex-col lg:flex-row mt-4 w-full items-right gap-3 md:mt-8">
        <Search className="w-full" placeholder="Search Transactions" />
        <SelectDate
          buttonClassName="flex-grow-0 h-12  dark:bg-neutral-900 text-secondary-foreground"
          className=" text-muted-foreground "
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
      <div className="sticky lg:absolute bottom-5  flex w-full lg:bg-transparent justify-center">
        <div className="w-min dark:bg-neutral-950/75 backdrop-blur bg-neutral-50/75 p-2 rounded-lg border lg:border-0 lg:bg-none">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </main>
  )
}
