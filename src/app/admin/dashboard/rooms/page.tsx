import Search from "@/components/search"
import Table from "./table"
import { CreateStudent } from "./buttons"
import { Suspense } from "react"
import { StudentsTableSkeleton } from "@/components/skeletons"
// import Pagination from "./pagination"
import { fetchStudentPages } from "@/lib/data"
import { RoomTableSkelly } from "@/components/dashboard/rooms/tableSkeleton"
import Pagination from "./pagination"
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

  // const totalPages = await fetchStudentPages(query) // 12/6 = 2

  // console.log("QUERY:", query, currentPage, totalPages)
  return (
    <main>
      <h1 className={` mb-4 text-xl md:text-2xl`}>Rooms</h1>
      {/* <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search Students" />
        <CreateStudent />
      </div> */}
      <Suspense key={query + currentPage} fallback={<RoomTableSkelly />}>
        <Table query={query} currentPage={currentPage} />
        {/* <RoomTableSkelly /> */}
      </Suspense>
      <div className="uumt-5 flex w-full justify-center">
        <Pagination totalPages={4} />
      </div>
    </main>
  )
}
