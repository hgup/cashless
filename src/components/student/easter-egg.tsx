"use client"

import { toast } from "../ui/use-toast"

export default function EasterEgg({ regd_no }: { regd_no: string }) {
  if (regd_no === "223227") {
    toast({
      title: "Hey Kautss",
      description: (
        <span className="text-xl font-display">
          PLEASE PRACTICE A NEW PIECE SAIRAM.
        </span>
      ),
      translate: "no",
      className:
        "translate-y-14 lg:translate-y-0 bg-gradient-to-r from-neutral-900 to-neutral-800 text-white text-2xl",
    })
  }
  if (regd_no === "223313") {
    toast({
      title: "Hey Parthiv",
      description: <span className="text-2xl font-display">SHUT UP NA</span>,
      translate: "no",
      className:
        "translate-y-14 lg:translate-y-0 bg-gradient-to-r from-neutral-900 to-neutral-800 text-white text-2xl",
    })
  }

  return <></>
}
