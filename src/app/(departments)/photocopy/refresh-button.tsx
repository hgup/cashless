"use client"
import { RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { refreshOrders } from "@/lib/actions"
import clsx from "clsx"
import React from "react"

export default function RefreshButton() {
  const [loading, setLoading] = React.useState(false)
  return (
    <form
      onSubmit={(e: React.FormEvent) => {
        e.preventDefault()
        refreshOrders()
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
        }, 2000)
      }}
    >
      <Button variant={"outline"} className="w-10 h-10 p-0 aspect-square">
        <RefreshCw
          className={clsx("w-5 h-5 text-muted-foreground", {
            "animate-spin ease-in-out": loading,
          })}
        />
      </Button>
    </form>
  )
}
