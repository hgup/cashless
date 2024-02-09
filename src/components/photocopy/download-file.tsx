"use client"

import { Download } from "lucide-react"
import { Button } from "../ui/button"
import { getOrderFileName } from "@/lib/utils"

export default function DownloadComponent({
  file,
  className,
}: {
  file: string
  className: string
}) {
  const handleClick = async () => {
    const response = await fetch(`/api/file?file=${file}`)
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = getOrderFileName(file)
    link.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <main>
      <button type="button" onClick={handleClick} className={className}>
        <Download />
      </button>
    </main>
  )
}
