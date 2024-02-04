"use client"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import clsx from "clsx"

const links = [
  { name: "Dashboard", href: "/student" },
  {
    name: "Photocopy",
    href: "/student/photocopy",
  },
]

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {links.map((link) => {
        // const LinkIcon = link.icon
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "text-sm text-muted-foreground transition-colors hover:text-primary",
              {
                "text-primary": pathname === link.href,
              }
            )}
          >
            {/* <LinkIcon className="w-8" /> */}
            <p className="">{link.name}</p>
          </Link>
        )
      })}
    </nav>
  )
}
