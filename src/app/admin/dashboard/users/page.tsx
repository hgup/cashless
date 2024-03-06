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

  // console.log("QUERY:", query, currentPage, totalPages)
  return (
    <main className="relative lg:h-[850px]">
      <div className="flex flex-col mb-6 pt-3 items-left gap-5 ">
        <h1
          className={`font-bold text-2xl md:text-2xl  text-neutral-700 dark:text-neutral-300`}
        >
          Users
        </h1>
      </div>
      <div className=" mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search Users" />
        {/* <CreateStudent /> */}
      </div>
      <Suspense key={query + currentPage} fallback={<StudentsTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="sticky lg:absolute bottom-5 mt-6 lg:mt-0 flex w-full lg:bg-transparent justify-center">
        <div className="w-min dark:bg-neutral-950/75 lg:shadow-lg backdrop-blur bg-neutral-50/75 p-2 rounded-lg   lg:bg-none">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </main>
  )
}
