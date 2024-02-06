"use client"

import { toast } from "../ui/use-toast"

export default function EasterEgg({ regd_no }: { regd_no: string }) {
  if (regd_no === "223313") {
    toast({
      title: "Hey Parthiv",
      description: "Shut up na",
      className:
        "bg-gradient-to-r from-blue-600 to-green-600 text-white text-2xl",
    })
  }

  return <></>
}
