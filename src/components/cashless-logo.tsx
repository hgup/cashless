// import { lusitana } from '@/app/ui/fonts';

import { CurrencyRupeeIcon } from "@heroicons/react/24/outline"
import { IconJarLogoIcon, ModulzLogoIcon } from "@radix-ui/react-icons"
import { Card } from "./ui/card"

export default function CashlessLogo() {
  return (
    <div className={`flex flex-row justify-center items-center aspect-square`}>
      <CurrencyRupeeIcon className="h-10 w-10 rotate-[15deg]" />
    </div>
  )
}
