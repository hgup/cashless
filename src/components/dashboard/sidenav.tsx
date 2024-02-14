import NavLinks from "@/components/dashboard/nav-links"
import CashlessLogo from "@/components/cashless-logo"
import { UserNav } from "@/components/usernav"
import { auth } from "../../auth"

export default async function SideNav() {
  const authsession = await auth()

  if (authsession?.user) {
    return (
      <div
        className="fixed top-0 z-10 flex flex-row w-full lg:w-28 h-20 lg:h-full  lg:flex-col gap-0 md:gap-5 
bg-primary-foreground/75 backdrop-blur
    "
      >
        <CashlessLogo className="" />
        <div className="flex grow flex-row gap-0 lg:flex-col items-center lg:mt-4 lg:mb-4">
          <div className="flex grow flex-row gap-2 md:gap-5 lg:gap-0 w-full lg:flex-col">
            <NavLinks />
          </div>

          <div className="md:m-4">
            <UserNav user={authsession?.user} />
          </div>
        </div>
      </div>
    )
  }
}
