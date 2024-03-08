import { MainNav } from "@/components/student/main-nav"
import { Search } from "@/components/student/search"
import TeamSwitcher from "@/components/student/team-switcher"
import { users } from "@prisma/client"
import { UserNav } from "./usernav"
import CashlessLogo from "../cashless-logo"
import { User } from "next-auth"
import Notifications from "./notifications"

export default function Navbar({ student }: { student: users }) {
  return (
    <header className="fixed z-10 top-0 w-full bg-primary-foreground/75 backdrop-blur">
      <div className="flex justify-center h-16 py-7 gap-2 items-center px-6">
        <CashlessLogo className="" />
        {student.role !== "STUDENT" ? <TeamSwitcher /> : null}
        <div className="ml-auto flex items-center ">
          <MainNav className="mr-3 md:mx-6" />
          <Notifications className="mr-3" />
          <UserNav student={student} />
        </div>
      </div>
    </header>
  )
}
