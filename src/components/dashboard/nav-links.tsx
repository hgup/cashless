"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from "clsx"
import {
  HomeIcon,
  CurrencyRupeeIcon,
  MapIcon,
  NewspaperIcon,
  UserIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline"

const links = [
  { name: "Home", href: "/admin/dashboard", icon: HomeIcon },
  {
    name: "Transactions",
    href: "/admin/dashboard/transactions",
    icon: CurrencyRupeeIcon,
  },
  // { name: "Trips", href: "/dashboard/trips", icon: MapIcon },
  { name: "Rooms", href: "/admin/dashboard/rooms", icon: UserGroupIcon },
  { name: "Student", href: "/admin/dashboard/student", icon: UserIcon },
]

export default function NavLinks() {
  const pathname = usePathname()
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md dark:bg-stone-800 bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-emerald-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-sky-100 dark:bg-slate-950 text-emerald-600":
                  pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        )
      })}
    </>
  )
}
