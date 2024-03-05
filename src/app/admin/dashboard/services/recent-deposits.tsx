import StudentAvatar from "@/components/student-avatar"
import { TransactedAmount } from "@/components/transacted-amount"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { fetchRecentDeposits } from "@/lib/data"
import { format } from "date-fns"

export default async function RecentDeposits() {
  const transactions = await fetchRecentDeposits()
  const today_count = transactions.length
  const date_today = new Date()
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Today - {format(date_today, "LLL dd, y")}</CardTitle>
        <CardDescription>
          You made {today_count}
          {today_count == 1 ? " deposit " : " deposits "}
          today.
        </CardDescription>
      </CardHeader>
      <CardContent className="overflow-y-scroll scroll-smooth">
        <div className="space-y-8 h-[300px]">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center">
              <StudentAvatar
                src={transaction.student.photo}
                name={transaction.student.name}
              />
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {transaction.student.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {transaction.particulars}
                </p>
              </div>
              <div className="ml-auto font-medium">
                <TransactedAmount amount={transaction.amount} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
