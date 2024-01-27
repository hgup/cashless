import Form from "./edit-form"
import Breadcrumbs from "@/components/ui/breadcrumbs"
import { fetchStudentById } from "@/lib/data"
import { notFound } from "next/navigation"
import { RegdBadge } from "../../table"

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id
  const student = await fetchStudentById(id)

  if (!student) {
    notFound()
  }
  const badge = RegdBadge.bind(null, { regd_no: student.regd_no })
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Student", href: "/dashboard/student" },
          {
            label: `Edit details of ${student.regd_no}`,

            href: `/dashboard/student/${id}/edit`,
            active: true,
          },
        ]}
      />
      <div className="">
        <Form student={student} />
      </div>
    </main>
  )
}
