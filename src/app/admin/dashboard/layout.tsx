import SideNav from "@/components/dashboard/sidenav"
import { Toaster } from "@/components/ui/toaster"
import { Card } from "@/components/ui/card"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-32 md:h-full">
        <SideNav />
        <Toaster />
      </div>

      <div className="flex-grow p-6 mt-16 md:mt-0 md:overflow-y-auto md:p-12 rounded-l-lg rounded-none">
        {children}
      </div>
    </div>
  )
}
