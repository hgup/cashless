"use client"

import { Download, Loader2 } from "lucide-react"
import { Button } from "../ui/button"
import { getOrderFileName } from "@/lib/utils"
import React from "react"

export default function DownloadComponent({
  file,
  className,
}: {
  file: string
  className: string
}) {
  const [loading, setLoading] = React.useState(false)
  const handleClick = async () => {
    setLoading(true)
    const response = await fetch(`/api/file?file=${file}`)
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = getOrderFileName(file)
    link.click()
    window.URL.revokeObjectURL(url)
    setLoading(false)
  }

  return (
    <main>
      <button type="button" onClick={handleClick} className={className}>
        {loading ? <Loader2 className="animate-spin" /> : <Download />}
      </button>
    </main>
  )
}
