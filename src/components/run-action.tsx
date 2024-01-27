import * as React from "react"
import { Power } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { runAction } from "@/lib/actions"

export function RunAction() {
  return (
    <form
      action={async () => {
        runAction()
      }}
    >
      <Button variant="outline" size="icon" type="submit">
        <Power className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </form>
  )
}
