"use client"

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import { usePathname, useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"
import { Button } from "@/components/ui/button"
import { Dept } from "@prisma/client"
import { CalendarCheck2Icon, PanelsRightBottomIcon } from "lucide-react"
import { useState } from "react"

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", "1")
    if (term) {
      // if a search term exists only then let query string stay, else delete
      params.set("query", term)
    } else {
      params.delete("query")
    }
    replace(`${pathname}?${params.toString()}`) // updates the URL with the user's search data
    // URL is updated without reloading the page, client-side navigation Supremacy
  }, 150)

  const departments = Object.values(Dept).map((d) => ({
    key: Dept[d],
    value: d,
  }))
  const [dept, setDept] = useState(departments.map((d) => d.value.toString()))
  console.log(dept)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" type="button" className="flex gap-2 p-2 ">
          <PanelsRightBottomIcon />
          <span>Department</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* <DropdownMenuRadioGroup value={dept} onValueChange={setDept}>
            {
                departments.
            }
        </DropdownMenuRadioGroup> */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
