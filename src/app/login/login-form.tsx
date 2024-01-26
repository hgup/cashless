"use client"

// import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
  ArrowRightIcon,
  HashtagIcon,
} from "@heroicons/react/24/outline"
// import { Button } from '@/app/ui/button';
import { useFormState, useFormStatus } from "react-dom"
import { authenticate } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined)

  return (
    <form action={dispatch} className="space-y-3">
      <Card className="flex-1 rounded-lg  px-6 pb-4 pt-8">
        <h3 className={` mb-3 text-2xl`}> Please log in to continue. </h3>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900 dark:text-white"
              htmlFor="regd_no"
            >
              REGD Number
            </label>
            <div className="relative">
              <Input
                className="peer block w-full rounded-md border border-gray-200 dark:border-stone-700 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="regd_no"
                type="regd_no"
                name="regd_no"
                placeholder="212345 or 1234..."
                required
              />
              <HashtagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-stone-200 peer-focus:dark:text-emerald-200  peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900 dark:text-white"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <Input
                className="peer block w-full rounded-md border border-gray-200 dark:border-stone-700 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-stone-200 peer-focus:dark:text-emerald-200  peer-focus:text-gray-900" />
            </div>
          </div>
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
      </Card>
    </form>
  )
}

function LoginButton() {
  const { pending } = useFormStatus()

  return (
    <Button variant={"default"} className="mt-4 w-full" aria-disabled={pending}>
      Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  )
}
