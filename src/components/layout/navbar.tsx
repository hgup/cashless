"use client"

import Image from "next/image"
import Link from "next/link"
import useScroll from "@/lib/hooks/use-scroll"
import { Session, User } from "next-auth"
import CashlessLogo from "../cashless-logo"
import Navbar from "../student/navbar"
import { UserNav } from "../usernav"

export default function NavBar({ authUser }: { authUser: User }) {
  const scrolled = useScroll(50)

  return (
    <div
      className={`fixed top-0 w-full flex justify-center ${
        scrolled
          ? "border-b border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-black/50 backdrop-blur-xl"
          : "bg-white/0 dark:bg-black/0"
      } z-30 transition-all`}
    >
      <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between w-full">
        <div className="flex flex-row items-center">
          <CashlessLogo className="w-[30px] h-[30px] mr-2 rounded-sm" />
          <p>Cashless</p>
        </div>
        <UserNav user={authUser} />
      </div>
    </div>
  )
}
