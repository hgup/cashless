import CashlessLogo from "@/components/cashless-logo"
import LoginForm from "./login-form"
import { Card } from "@/components/ui/card"

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <LoginForm />
      </div>
    </main>
  )
}
