// import { lusitana } from '@/app/ui/fonts';

import { CurrencyRupeeIcon } from "@heroicons/react/24/outline"
import { Card } from "./ui/card"
import { CircleSlash2 } from "lucide-react"
import { GitHubLogoIcon, NotionLogoIcon } from "@radix-ui/react-icons"

export default function CashlessLogo() {
  return (
    <div className={`flex flex-row justify-center items-center aspect-square`}>
      <CircleSlash2
        fillRule="inherit"
        className="h-12 w-12 rotate-[1deg] text-muted-foreground"
      />
    </div>
  )
}
