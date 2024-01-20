import Form from "./edit-form"
import Breadcrumbs from "@/components/ui/breadcrumbs"
import { fetchStudentById } from "@/lib/data"
import { notFound } from "next/navigation"

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id
  const student = await fetchStudentById(id)
  // invoices can potentially be undefined. ERROR handle it later
  if (!student) {
    notFound()
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Student", href: "/dashboard/student" },
          {
            label: "Edit Student Details",
            href: `/dashboard/student/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form student={student} />
    </main>
  )
}
