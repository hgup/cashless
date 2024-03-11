import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { fetchHighlightsInfo } from "@/lib/data"
import { formatCurrency } from "@/lib/utils"
import clsx from "clsx"

import { ArrowLeftRight, CreditCard, IndianRupee } from "lucide-react"
import { formatWithOptions } from "util"

export async function Highlights({ regd }: { regd: string }) {
  const [
    last_week_spent,
    this_week_spent,
    sub_cost,
    total_transactions,
    this_month_count,
  ] = await fetchHighlightsInfo(regd)
  // console.log(last_week_spent, this_week_spent, sub_cost, total_transactions)

  return (
    <div className="flex-grow-0 grid gap-3 lg:gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card
        className={clsx(
          "backdrop-blur-lg dark:bg-neutral-900",
          this_week_spent
            ? {
                "dark:bg-green-400/65 bg-green-300": this_week_spent < 200,
                "dark:bg-blue-400/65 bg-blue-300":
                  200 <= this_week_spent && this_week_spent < 500,
                "dark:bg-red-400/65 bg-red-300": this_week_spent >= 500,
              }
            : null
        )}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0  pb-0">
          <CardTitle className="text-sm font-medium">Weekly spent</CardTitle>
          <IndianRupee className="" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(this_week_spent ? -this_week_spent : 0)}
          </div>
          {last_week_spent && this_week_spent ? (
            <p className="text-xs text-muted-foreground">
              {(
                ((this_week_spent - last_week_spent) / last_week_spent) *
                100
              ).toFixed(2)}
              % from last month
            </p>
          ) : null}
        </CardContent>
      </Card>
      <Card className="dark:bg-neutral-900">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
          <CardTitle className="text-sm font-medium">
            Total Transactions
          </CardTitle>
          <ArrowLeftRight className="" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{total_transactions}</div>
        </CardContent>
      </Card>
      <Card className="dark:bg-neutral-900 ">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
          <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
          <CreditCard className="" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(sub_cost ?? 0)}/month
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
