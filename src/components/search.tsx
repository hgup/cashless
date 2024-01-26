"use client"

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { usePathname, useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"
import { Input } from "./ui/input"

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

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <Input
        className=""
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value)
        }}
        defaultValue={searchParams.get("query")?.toString()} // for sharing links
      />
      <label htmlFor="search" className="sr-only"></label>
    </div>
  )
}
