"use client"

import { ExclamationCircleIcon } from "@heroicons/react/24/outline"
import { useFormState, useFormStatus } from "react-dom"
import { authenticate } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import React from "react"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import OtpInput from "react-otp-input"

// interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function UserAuthForm() {
  // {
  //   className,
  //   ...props
  // }: UserAuthFormProps) {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined)
  const [otp, setOtp] = React.useState("")
  const [regd, setRegd] = React.useState("")

  React.useEffect(() => {
    const form = formRef.current

    // if (otp.length == 0) {
    //   const regdCode = document.getElementsByClassName("regdCode")
    //   if (regdCode) {
    //     ;(regdCode[regdCode.length - 1] as HTMLInputElement).focus()
    //   }
    // }

    if (otp.length == 4) {
      if (form) {
        form.requestSubmit()
        const passcode = document.getElementsByClassName("passcode")

        if (passcode) {
          ;(passcode[0] as HTMLInputElement).focus()
        }
        setOtp("")
        // ;(passcodeDiv?.firstChild as HTMLInputElement).focus()
      }
    }
  }, [otp])
  React.useEffect(() => {
    setOtp("")
  }, [errorMessage])
  React.useEffect(() => {
    if (regd.length == 6) {
      const passcode = document.getElementsByClassName("passcode")
      if (passcode) {
        ;(passcode[0] as HTMLInputElement).focus()
      }
    }
  }, [regd])
  const formRef = React.useRef<HTMLFormElement>(null)

  return (
    <div className={cn("grid gap-6")}>
      {/* , className)} {...props}> */}
      <form
        id="authForm"
        ref={formRef}
        action={(formData) => {
          formData.append("regd_no", regd)
          formData.append("password", otp)
          dispatch(formData)
        }}
        // action={(formData) => {
        //   formData.append("password", otp)
        //   formData.append("regd_no", regd)
        //   dispatch(formData)
        // }}
        className="space-y-3 min-w-[300px] mx-auto"
      >
        <div className="grid gap-2">
          <div className="flex flex-col gap-3 items-center">
            <OtpInput
              shouldAutoFocus={true}
              inputStyle="regdCode"
              value={regd}
              inputType="text"
              onChange={(o) => {
                setRegd(o)
              }}
              numInputs={6}
              renderSeparator={<span className="w-3"></span>}
              renderInput={(props) => <input {...props} />}
            />

            <span className="text-muted-foreground  text-xs">
              {" "}
              Enter your Regd. number
            </span>
          </div>
          {/* 
          <div className="grid gap-1">
            <div className="relative w-full h-10">
              <input
                name="regd_no"
                id="regd_no"
                className="peer w-full h-full bg-transparent text-neutral-500 font-sans font-normal outline outline-0 focus:outline-0 
                disabled:bg-neutral-50 disabled:border-0 transition-all placeholder-shown:border 
                dark:placeholder-shown:border-neutral-200 dark:placeholder-shown:border-x-neutral-200  
                placeholder-shown:border-t-neutral-200 border focus:border-2 border-t-transparent dark:border-t-transparent focus:border-t-transparent dark:focus:border-t-transparent
                text-sm px-3 py-2.5 rounded-[7px] border-neutral-200  focus:border-neutral-900 dark:focus:border-neutral-200  dark:focus-border-neutral-200"
                placeholder=" "
                value={regd}
                onChange={(e) => setRegd(e.target.value)}
                autoFocus={true}
              />
              <label
                htmlFor="regd_no"
                className="flex w-full h-full select-none pointer-events-none absolute left-0 font-semibold !overflow-visible truncate peer-placeholder-shown:text-neutral-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-neutral-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] 
                before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md dark:after:border-t after:border-t peer-focus:after:border-t-2
                after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] 
                dark:text-neutral-200 text-neutral-800 dark:peer-focus:text-neutral-300 peer-focus:text-neutral-900 dark:before:border-neutral-900 before:border-neutral-200 
                dark:peer-focus:before:!border-neutral-200 peer-focus:before:!border-neutral-900 dark:after:border-neutral-900 after:border-neutral-200 dark:peer-focus:after:!border-neutral-200 peer-focus:after:!border-neutral-900"
              >
                Regd #
              </label>
            </div>
          </div> */}

          <div className="w-full my-4 items-center flex flex-col ">
            <OtpInput
              inputStyle="passcode"
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
          <LoginButton />
          <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            {errorMessage && (
              <>
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                <span className="text-sm text-red-500">{errorMessage}</span>
              </>
            )}
          </div>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Never Share <span className="font-bold">your passcode</span> with
            anyone!
          </span>
        </div>
      </div>
      {/* <Button variant="outline" type="button" disabled={isLoading}>
        { ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <GitHubLogoIcon className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub
      </Button> */}
    </div>
  )
}

function LoginButton() {
  const { pending } = useFormStatus()

  return (
    <Button disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Continue
    </Button>
  )
}
