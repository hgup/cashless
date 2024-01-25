// import { lusitana } from '@/app/ui/fonts';

import { CurrencyRupeeIcon } from "@heroicons/react/24/outline"
import { IconJarLogoIcon, ModulzLogoIcon } from "@radix-ui/react-icons"

export default function CashlessLogo() {
  return (
    <div className={` flex flex-row items-center  text-white`}>
      <CurrencyRupeeIcon className="h-10 w-10 rotate-[15deg]" />
      <p className="text-[35px] md:text-[35px]">Cashless</p>
    </div>
  )
}
