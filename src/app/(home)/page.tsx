import { sfPro, inter } from "@/../fonts"
import Nav from "@/components/layout/nav"
import Footer from "@/components/layout/footer"
import { Suspense } from "react"
import clsx from "clsx"
import Image from "next/image"
import Content from "./content"

export const metadata = {
  title: "Cashless - BRN",
  description: "A onestop solution to all your cash problems.",
  // metadataBase: new URL("http"),
}

export default function Page() {
  return (
    <div className={clsx(sfPro.variable, inter.variable)}>
      <div className="fixed h-screen w-full bg-gradient-to-br from-neutral-200 via-white to-neutral-100 dark:from-neutral-900 dark:via-black dark:to-neutral-950" />
      <Nav />
      <main className="flex min-h-screen w-full flex-col items-center justify-center py-32">
        <Content />
      </main>
      <Footer />
    </div>
  )
}
