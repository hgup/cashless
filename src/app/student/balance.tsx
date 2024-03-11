"use client"

import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"
import clsx from "clsx"
import { Wallet2 } from "lucide-react"
import React from "react"

export default function Balance({
  amount,
  className,
}: {
  amount: number
  className: string
}) {
  const [show, setShow] = React.useState(false)
  return (
    <Button
      variant="outline"
      className={clsx("h-9 text-base", className)}
      onClick={() => setShow((s) => !s)}
    >
      {show ? (
        <div>{formatCurrency(amount)}</div>
      ) : (
        <div>
          {" "}
          <Wallet2 />{" "}
        </div>
      )}
    </Button>
  )
}
