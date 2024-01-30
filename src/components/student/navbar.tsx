import { MainNav } from "@/components/student/main-nav"
import { Search } from "@/components/student/search"
import TeamSwitcher from "@/components/student/team-switcher"
import { users } from "@prisma/client"
import { UserNav } from "./usernav"
import CashlessLogo from "../cashless-logo"

export default function Navbar({ student }: { student: users }) {
  return (
    <header className="fixed z-10 top-0 w-full bg-primary-foreground/75 backdrop-blur">
      <div className="flex h-16 py-7   items-center px-6">
        <CashlessLogo className="" />
        {/* <TeamSwitcher /> */}
        <div className="ml-auto flex items-center space-x-4">
          <MainNav className="mx-6" />
          <UserNav student={student} />
        </div>
      </div>
    </header>
  )
}
