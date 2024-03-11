import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import UserAuthForm from "./page"

export const metadata: Metadata = {
  title: "Authentication",
  description: "Log in to your cashless account",
}

export default function AuthenticationPage({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="relative grid w-full lg:h-full flex-col items-center lg:justify-center  lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative lg:h-full flex flex-col w-full bg-muted p-10 text-white dark:border-r mb-20 lg:mb-0">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium pb-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Cashless BRN
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Because cash should never become an inconvenience.&rdquo;
              </p>
              <footer className="text-sm">
                An Initiative by{" "}
                <span className="uppercase font-bold text-red-400">
                  Mahendras (2k23-24)
                </span>
              </footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Log in to your Account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your Registration ID and passcode to proceed
              </p>
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
