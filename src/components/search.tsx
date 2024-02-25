"use client"

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { usePathname, useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"
import { Input } from "./ui/input"
import { cn } from "@/lib/utils"

export default function Search({
  placeholder,
  className,
  query,
}: {
  placeholder: string
  className?: string
  query?: string
}) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const q = query ?? "query"
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", "1")
    if (term) {
      // if a search term exists only then let query string stay, else delete
      params.set(q, term)
    } else {
      params.delete(q)
    }
    replace(`${pathname}?${params.toString()}`) // updates the URL with the user's search data
    // URL is updated without reloading the page, client-side navigation Supremacy
  }, 150)

  return (
    <div className={cn(className, "relative flex flex-1 flex-shrink-0")}>
      <Input
        className="h-12 dark:bg-neutral-900 dark:focus-within:bg-neutral-950 "
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value)
        }}
        defaultValue={searchParams.get(q)?.toString()} // for sharing links
      />
      <label htmlFor={`${q}-search`} className="sr-only"></label>
    </div>
  )
}
