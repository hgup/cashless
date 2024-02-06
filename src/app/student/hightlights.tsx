import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { fetchHighlightsInfo } from "@/lib/data"
import { formatCurrency } from "@/lib/utils"

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
    <div className="flex-grow-0 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Weekly spent</CardTitle>
          <IndianRupee className="text-muted-foreground" />
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
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Transactions
          </CardTitle>
          <ArrowLeftRight className="text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{total_transactions}</div>
          <p className="text-xs text-muted-foreground">Going Cashless!</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
          <CreditCard className="text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(sub_cost ?? 0)}/month
          </div>
          <p className="text-xs text-muted-foreground">+19% from last month</p>
        </CardContent>
      </Card>
    </div>
  )
}
