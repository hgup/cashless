// import { lusitana } from '@/app/ui/fonts';

import { CurrencyRupeeIcon } from "@heroicons/react/24/outline"
import { Card } from "./ui/card"
import {
  CatIcon,
  CircleDotDashedIcon,
  CircleSlash2,
  Snowflake,
} from "lucide-react"
import {
  CircleBackslashIcon,
  GitHubLogoIcon,
  NotionLogoIcon,
} from "@radix-ui/react-icons"
import React from "react"

export default function CashlessLogo({ className }: { className: string }) {
  return (
    <div
      className={`flex flex-row ${className} justify-center items-center aspect-square`}
    >
      <Snowflake fillRule="inherit" className="h-6 w-6 md:h-8 md:w-8  " />
    </div>
  )
}
