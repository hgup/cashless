import { fetchFilteredStudentsForSearch, fetchStudentById } from "@/lib/data"
import Deposit from "./deposit"

export default async function ServicePage({
  searchParams,
}: {
  searchParams?: {
    depositq?: string
    page?: string
    selectedStudent?: string
  }
}) {
  const depositq = searchParams?.depositq || ""
  const isDepSearch = !!searchParams?.depositq

  const page = Number(searchParams?.page) || 1

  const student = await fetchStudentById(searchParams?.selectedStudent ?? "")

  const students = await fetchFilteredStudentsForSearch(depositq, page)
  return (
    <main>
      <div className="flex flex-col mb-6 pt-3 items-left gap-5 ">
        <h1 className={`font-bold text-2xl md:text-2xl  text-neutral-700`}>
          Services
        </h1>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1">
        <Deposit
          students={students}
          isSearching={isDepSearch}
          selectedStudent={student}
        />
      </div>
    </main>
  )
}
