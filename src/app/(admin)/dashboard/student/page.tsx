import Search from "@/components/search"
import Table from "./table"
import { CreateStudent } from "./buttons"
import { Suspense } from "react"
import { StudentsTableSkeleton } from "@/components/skeletons"
import Pagination from "@/components/pagination"
import { fetchStudentPages } from "@/lib/data"

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string
    page?: string
  }
}) {
  const query = searchParams?.query || ""
  const currentPage = Number(searchParams?.page) || 1

  const totalPages = await fetchStudentPages(query) // 12/6 = 2

  console.log("QUERY:", query, currentPage, totalPages)
  return (
    <main>
      <h1 className={` mb-4 text-xl md:text-2xl`}>Student Details</h1>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search Students" />
        <CreateStudent />
      </div>
      <Suspense key={query + currentPage} fallback={<StudentsTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </main>
  )
}
