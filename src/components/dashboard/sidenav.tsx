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

  return (
    <div
      className="fixed top-0 z-10 flex w-full md:w-32 md:h-full flex-row pr-4 md:flex-col p-4 gap-5 md:px-2 md:pb-8
bg-primary-foreground/75 backdrop-blur
    "
    >
      <CashlessLogo className="mx-3 md:mx-0" />
      <div className="flex flex-row grow justify-between md:flex-col items-center md:mt-4">
        <div className="flex grow flex-row gap-4  md:flex-col">
          <NavLinks />
        </div>

        <UserNav user={authsession?.user} />
      </div>
    </div>
  )
}
