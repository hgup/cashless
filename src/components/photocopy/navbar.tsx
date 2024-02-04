import { MainNav } from "@/components/student/main-nav"
import { Search } from "@/components/student/search"
import TeamSwitcher from "@/components/student/team-switcher"
import { users } from "@prisma/client"
import CashlessLogo from "../cashless-logo"
import { UserNav } from "../usernav"
import { User } from "next-auth"

export default function Navbar({ student }: { student: User }) {
  return (
    <header className="fixed z-10 top-0 w-full bg-primary-foreground/75 backdrop-blur">
      <div className="flex h-16 py-7 gap-2  items-center px-6">
        <CashlessLogo className="" />
        {student.role !== "STUDENT" ? <TeamSwitcher /> : null}
        <div className="ml-auto flex items-center space-x-4">
          <UserNav user={student} />
        </div>
      </div>
    </header>
  )
}
