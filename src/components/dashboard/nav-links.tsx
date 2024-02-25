"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from "clsx"
import {
  HomeIcon,
  AtSymbolIcon,
  UserIcon,
  UserGroupIcon,
  WalletIcon,
} from "@heroicons/react/24/outline"

const links = [
  { name: "Home", href: "/admin/dashboard", icon: HomeIcon },
  {
    name: "Services",
    href: "/admin/dashboard/services",
    icon: AtSymbolIcon,
  },
  {
    name: "Transaction",
    href: "/admin/dashboard/transactions",
    icon: WalletIcon,
  },
  // { name: "Trips", href: "/dashboard/trips", icon: MapIcon },
  { name: "Users", href: "/admin/dashboard/users", icon: UserIcon },

  { name: "Rooms", href: "/admin/dashboard/rooms", icon: UserGroupIcon },
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
              "flex md:flex-row  p-2  bg-primary-foreground/65 rounded-full lg:rounded-none lg:p-0 lg:bg-transparent hover:text-lg group  lg:flex-col relative text-muted-foreground lg:aspect-square items-center justify-center gap-2",
              {
                "text-secondary-foreground  lg:border-secondary-foreground bg-secondary/60 lg:bg-primary-foreground/65 lg:border-r-2":
                  pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6 lg:w-7" />
            <p className="hidden md:flex lg:block h-min text-xs">{link.name}</p>
          </Link>
        )
      })}
    </>
  )
}
