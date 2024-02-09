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
  { name: "Users", href: "/admin/dashboard/student", icon: UserIcon },

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
              "flex md:flex-row hover:text-lg group  lg:flex-col relative text-muted-foreground aspect-square items-center justify-center gap-2",
              {
                "text-secondary-foreground border-secondary-foreground bg-primary-foreground/65 border-r-2":
                  pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-8 " />
            <p className="hidden md:flex lg:block h-min text-sm ">
              {link.name}
            </p>
          </Link>
        )
      })}
    </>
  )
}
