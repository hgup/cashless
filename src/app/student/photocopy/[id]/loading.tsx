import { Loader, Loader2Icon } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-32 md:min-h-full w-full ">
      <Loader2Icon className="animate-spin md:w-16 md:h-16 w-8 h-8" />
    </div>
  )
}
