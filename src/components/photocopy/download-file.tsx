"use client"

import { Button } from "../ui/button"
import { getOrderFileName } from "@/lib/utils"

export default function DownloadComponent({ file }: { file: string }) {
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
      <Button type="button" onClick={handleClick}>
        Download
      </Button>
    </main>
  )
}
