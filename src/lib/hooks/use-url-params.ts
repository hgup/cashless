"use client"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import React from "react"

export default function useUrlParams(q: string, value?: string) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const params = new URLSearchParams(searchParams)
  React.useEffect(() => {
    // if a search term exists only then let query string stay, else delete
    if (value) {
      params.set(q, value)
    } else {
      params.delete(q)
    }
    replace(`${pathname}?${params.toString()}`) // updates the URL with the user's search data
    // URL is updated without reloading the page, client-side navigation Supremacy
  }, [])
}
