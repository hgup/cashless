"use state"
import React from "react"
import OtpInput from "react-otp-input"
import { Avatar, AvatarImage } from "./ui/avatar"
import { AvatarFallback } from "@radix-ui/react-avatar"
import { Badge } from "./ui/badge"
import { formatCurrency } from "@/lib/utils"
import { Loader2, LucideCloudLightning, Play, PlayIcon } from "lucide-react"
import clsx from "clsx"

import { useFormState, useFormStatus } from "react-dom"
import { ExclamationCircleIcon } from "@heroicons/react/24/outline"
import {
  photocopyPurchaseViaCashless,
  revalidatePhotocopy,
} from "@/lib/actions-transaction"
import { Button } from "./ui/button"
import { useToast } from "./ui/use-toast"
import { revalidatePath } from "next/cache"

export default function PaymentPortal({
  from,
  from_img,
  amount,
  to,
  to_img,
  id,
  particulars,
}: {
  from: string
  from_img: string
  amount: number
  to: string
  to_img: string
  id: string | number
  particulars: string
}) {
  const [otp, setOtp] = React.useState("")

  const formRef = React.useRef<HTMLFormElement>(null)
  const [formState, dispatch] = useFormState(
    photocopyPurchaseViaCashless,
    undefined
  )

  React.useEffect(() => {
    const form = formRef.current
    if (otp.length == 4) {
      if (form) {
        form.requestSubmit()
        const passcode = document.getElementsByClassName("passcode")

        if (passcode) {
          ;(passcode[0] as HTMLInputElement).focus()
        }
        setOtp("")
      }
    }
  }, [otp])

  const { toast } = useToast()
  React.useEffect(() => {
    if (formState?.message) {
      if (formState.status === "ERROR") {
        toast({ title: formState.message })
      } else if (formState.status === "SUCCESS") {
        toast({
          title: formState.message,
          className: "dark:bg-green-900 bg-green-300",
        })
        const revForm = document.getElementById(
          "revalidatePhotocopy"
        ) as HTMLFormElement
        if (revForm) {
          revForm.requestSubmit()
        }
      }
    }
  }, [formState?.status, formState?.message])

  return (
    <>
      <form
        ref={formRef}
        action={(formData) => {
          formData.set("regd_no", from)
          formData.set("password", otp)
          formData.set("amount", amount.toString())
          formData.set("id", id.toString())
          formData.set("particulars", particulars)
          dispatch(formData)
        }}
      >
        <div className="w-full flex flex-col gap-5">
          <div className="relative flex flex-row justify-evenly w-full items-center">
            <PaymentParty name={from} src={from_img} />
            <Line className="absolute -z-20 " />
            <Badge
              variant={"outline"}
              className="h-min text-[14px] font-normal bg-clip-padding border-green-500 dark:bg-neutral-950 bg-neutral-50"
            >
              {formatCurrency(amount)}
            </Badge>
            <PaymentParty name={to} src={to_img} />
          </div>

          <div className="w-full my-4 items-center flex flex-col ">
            <OtpInput
              inputStyle="passcode"
              shouldAutoFocus={true}
              value={otp}
              inputType="password"
              onChange={(o) => {
                setOtp(o)
              }}
              numInputs={4}
              renderSeparator={<span className="w-3"></span>}
              renderInput={(props) => <input {...props} />}
            />
            <span className="text-muted-foreground mt-2 text-xs">
              {" "}
              Enter your passcode
            </span>
          </div>
        </div>

        <div className="flex fle1-row gap-1">
          {formState?.status === "ERROR" && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <span className="text-sm text-red-500">{formState.message}</span>
            </>
          )}
        </div>
      </form>
      <form
        hidden={true}
        id="revalidatePhotocopy"
        action={() => {
          revalidatePhotocopy()
        }}
      ></form>
    </>
  )
}

function PaymentParty({ name, src }: { name: string; src: string }) {
  return (
    <Avatar className="h-14 w-14">
      <AvatarImage className="object-cover" src={src} />
      <AvatarFallback className="h-14 w-14 items-center flex flex-row px-auto bg-black">
        {name}
      </AvatarFallback>
    </Avatar>
  )
}

function Line({ className }: { className: string }) {
  const { pending } = useFormStatus()
  return (
    <div className={clsx(className, "")}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        // viewBox="0 0 100 100"
        width="200"
        height="50"
      >
        <rect x="0" y="24" width="200" height="3" fill="#1DB954">
          {/* <animate
          attributeName="height"
          values="55;35;65;55"
          dur="1s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          values="35;55;25;35"
          dur="1s"
          repeatCount="indefinite"
        /> */}
        </rect>
      </svg>
      <PlayIcon
        height="20"
        className="z-10 transform -translate-y-[35px] absolute   text-green-500 fill-green-500"
      >
        <animate
          attributeName="width"
          values="0;500"
          dur="5s"
          repeatCount="indefinite"
        />
      </PlayIcon>

      {/* <Play
        height="20"
        className="z-10 transform -translate-y-[35px] absolute text-green-500 fill-green-500"
      >
        <animate
          attributeName="width"
          values="0;200"
          dur="2s"
          repeatCount="indefinite"
        />
      </Play> */}
    </div>
  )
}
