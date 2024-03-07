import SideNav from "@/components/dashboard/sidenav"
import { Toaster } from "@/components/ui/toaster"
import { ModeToggle } from "@/components/toggle-theme"
import { RunAction } from "@/components/run-action"
// import { Navigation } from "@/components/student/navigation"
import Navbar from "@/components/student/navbar"
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
        <Navbar student={student} />
        <div className="my-auto h-full lg:px-0 px-2 md:overflow-y-auto ">
          {children}
        </div>
        {/* <div className="p-5 flex justify-end"></div> */}
      </div>
    )
  }
}
