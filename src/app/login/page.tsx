import CashlessLogo from "@/components/cashless-logo"
import LoginForm from "./login-form"

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="mb-2 flex h-20 items-end justify-start rounded-md bg-gradient-to-r dark:to-stone-800 dark:from-stone-800 from-emerald-400 to-emerald-300 p-4 md:h-40">
          <div className="w-32 text-white md:w-36">
            <CashlessLogo />
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  )
}
