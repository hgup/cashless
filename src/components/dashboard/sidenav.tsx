import Link from "next/link"
import NavLinks from "@/components/dashboard/nav-links"
import CashlessLogo from "@/components/cashless-logo"
import { signOut } from "@/auth"
import { PowerIcon } from "@heroicons/react/24/outline"
import { ModeToggle } from "@/components/toggle-theme"
import { RunAction } from "@/components/run-action"
import { Button } from "../ui/button"
import { UserNav } from "@/components/usernav"
import { auth } from "../../auth"

export default async function SideNav() {
  const authsession = await auth()

  if (authsession?.user) {
    return (
      <div
        className="fixed top-0 z-10 flex w-full lg:w-32 h-20 lg:h-full flex-row pr-4 lg:flex-col p-4 gap-5 lg:px-2 lg:pb-8
bg-primary-foreground/75 backdrop-blur
    "
      >
        <CashlessLogo className="mx-3 lg:mx-0" />
        <div className="flex flex-row grow justify-between lg:flex-col items-center lg:mt-4">
          <div className="flex grow flex-row gap-4  lg:flex-col">
            <NavLinks />
          </div>

          <UserNav user={authsession?.user} />
        </div>
      </div>
    )
  }
}
