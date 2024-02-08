import NavLinks from "@/components/dashboard/nav-links"
import CashlessLogo from "@/components/cashless-logo"
import { UserNav } from "@/components/usernav"
import { auth } from "../../auth"

export default async function SideNav() {
  const authsession = await auth()

  if (authsession?.user) {
    return (
      <div
        className="fixed top-0 z-10 flex w-full lg:w-28 h-20 lg:h-full flex-row lg:flex-col  gap-5 
bg-primary-foreground/75 backdrop-blur
    "
      >
        <CashlessLogo className="" />
        <div className="flex flex-row grow justify-between lg:flex-col items-center lg:mt-4 lg:mb-4">
          <div className="flex grow flex-row  w-full lg:flex-col">
            <NavLinks />
          </div>

          <UserNav user={authsession?.user} />
        </div>
      </div>
    )
  }
}
