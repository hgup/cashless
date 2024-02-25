import { Suspense } from "react"

export default async function Page() {
  return (
    <main>
      <div className="flex flex-col mb-6 pt-3 items-left gap-5 ">
        <h1 className={`font-bold text-2xl md:text-2xl  text-neutral-700`}>
          Dashboard
        </h1>
      </div>
    </main>
  )
}
