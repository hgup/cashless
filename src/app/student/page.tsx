import { Button } from "@/components/ui/button"
import SignOutButton from "@/components/ui/signout"
import { Printer } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

export default async function Page() {
  return (
    <main>
      <h1 className={` mb-4 text-xl md:text-2xl`}>Student</h1>
      <div className="flex flex-row gap-5 items-center ">
      <Button asChild variant="outline" className='flex flex-row gap-2 text-lg'>
        <Link href="/photocopy" className="p-5" >
        <Printer className="w-6 h-6"/>
            <span>Photocopy</span>
            </Link>
      </Button>
      <SignOutButton />

      </div>
    </main>
  )
}
