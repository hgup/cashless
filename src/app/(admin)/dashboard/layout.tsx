import SideNav from "@/components/dashboard/sidenav"
import { Toaster } from "@/components/ui/toaster"
import { ModeToggle } from "@/components/toggle-theme"
import { RunAction } from "@/components/run-action"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
        <Toaster />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
      <div className="p-5 flex justify-end">
        <div className="flex flex-row md:flex-col gap-2">
          <ModeToggle />
          <RunAction />
        </div>
      </div>
    </div>
  )
}
