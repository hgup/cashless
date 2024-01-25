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

async function seedDB() {}

async function setPhotos() {
  const students = await prisma?.users.findMany()
  students?.forEach(async (student) => {
    await prisma?.users.update({
      where: {
        regd_no: student.regd_no,
      },
      data: {
        photo: `/images/users/${student.regd_no}.png`,
      },
    })
  })
}

export function RunAction() {
  return (
    <form
      action={async () => {
        "use server"
        try {
          // setPhotos()
          console.log("RUN_ACTION SUCCESSFUL Operation Successful!")
        } catch (error) {
          console.error("RUN_ACTION ERROR:", error)
        }
      }}
    >
      <Button variant="outline" size="icon" type="submit">
        <Power className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </form>
  )
}
