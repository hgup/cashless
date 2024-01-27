import Link from "next/link"
import NavLinks from "@/components/dashboard/nav-links"
import CashlessLogo from "@/components/cashless-logo"
import { signOut } from "@/auth"
import { PowerIcon } from "@heroicons/react/24/outline"
import { ModeToggle } from "@/components/toggle-theme"
import { RunAction } from "@/components/run-action"
import { Button } from "../ui/button"
import { UserNav } from "../usernav"

export default function SideNav() {
  return (
    <div className="flex h-full flex-col p-4 gap-5 md:px-2 pb-8">
      {/* <CashlessLogo /> */}
      <div className="flex flex-row grow justify-between md:flex-col items-center">
        <div className="flex grow flex-row gap-4  md:flex-col">
          <NavLinks />
        </div>

        <UserNav />
        {/* <form
          action={async () => {
            "use server"
            await signOut()
          }}
        >
          <Button variant="default" className="flex gap-2 items-center">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </Button>
        </form> */}
      </div>
    </div>
  )
  // return (
  //   <div className="flex h-full flex-col px-3 py-4 md:px-2">
  //     <Link
  //       className="mb-2 flex h-20 items-end justify-start rounded-md bg-gradient-to-r dark:to-stone-800 dark:from-stone-900 from-emerald-400 to-emerald-300 p-4 md:h-40"
  //       href="/"
  //     >
  //       <div className=" text-white">
  //         <CashlessLogo />
  //       </div>
  //     </Link>
  //     <div className="flex grow flex-row justify-between space-x-2 md:flex-col dark:bg-stone-900 rounded-md md:p-4 p-2 gap-2 md:space-x-0 md:space-y-2">
  //       <NavLinks />
  //       <div className="hidden h-auto w-full grow rounded-md dark:bg-transparent bg-gray-50 md:block"></div>
  //       <form
  //         action={async () => {
  //           "use server"
  //           await signOut()
  //         }}
  //       >
  //         <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium dark:bg-stone-800 hover:bg-red-100 hover:text-red-500 md:flex-none md:justify-start md:p-2 md:px-3">
  //           <PowerIcon className="w-6" />
  //           <div className="hidden md:block">Sign Out</div>
  //         </button>
  //       </form>
  //     </div>
  //   </div>
  // )
}
