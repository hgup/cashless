import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/photocopy/navbar"
import { fetchStudentById } from "@/lib/data"
import { notFound } from "next/navigation"
import { auth } from "@/auth"

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const authdata = await auth()
  if (!authdata) {
    return null
  }
  const student = await fetchStudentById(authdata.user.regd_no)
  if (!student) {
    notFound()
  } else {
    return (
      <div className="min-h-screen flex flex-col">
        <Toaster />
        <Navbar student={student} />
        <div className="my-auto h-full lg:px-0 px-2 md:overflow-y-auto ">
          {children}
        </div>
      </div>
    )
  }
}
