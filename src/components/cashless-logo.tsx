// import { lusitana } from '@/app/ui/fonts';

import { IconJarLogoIcon } from "@radix-ui/react-icons"

export default function CashlessLogo() {
  return (
    <div className={` flex flex-row items-center leading-none text-white`}>
      <IconJarLogoIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[44px]">Cashlesssss</p>
    </div>
  )
}
