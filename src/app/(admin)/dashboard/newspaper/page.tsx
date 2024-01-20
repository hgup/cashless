import { $Enums } from "@prisma/client"
import { Suspense } from "react"

export default async function Page() {
  console.log(Object.values($Enums.Room))
  return (
    <main>
      <h1 className={` mb-4 text-xl md:text-2xl`}>Newspaper</h1>
    </main>
  )
}
