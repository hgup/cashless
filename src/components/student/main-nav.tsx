"use client"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import clsx from "clsx"
import {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
} from "../ui/navigation-menu"
import { Button } from "../ui/button"
import { useState } from "react"

const links = [
  {
    name: "Dashboard",
    href: "/student",
    description:
      "Show all details related to transactions over the past week and beyond.",
  },
  {
    name: "Photocopy",
    href: "/student/photocopy",
    description:
      "Place orders and view previous orders given to photocopy department",
  },
]

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()
  const current = links.find(({ href }) => href == pathname)
  return (
    <nav
      className={cn(
        "flex items-center space-x-4 lg:space-x-6 transition-all",
        className
      )}
      {...props}
    >
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>{current?.name}</NavigationMenuTrigger>
            <NavigationMenuContent className="flex flex-col lg:flex-row gap-5 p-5 ">
              {links.map((link) => (
                <NavigationMenuLink
                  key={link.name}
                  href={link.href}
                  className=" hover:outline-dashed transition-all duration-200 p-3 rounded-lg w-[200px]"
                >
                  <div className="font-semibold">{link.name}</div>
                  <div className="text-sm">{link.description}</div>
                </NavigationMenuLink>
              ))}
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      {/* {links.map((link) => {
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
            <LinkIcon className="w-8" /> 
            <p className="">{link.name}</p>
          </Link>
        )
      })} */}
    </nav>
  )
}
