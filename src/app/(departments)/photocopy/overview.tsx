import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { RecentTransactions } from "@/components/student/recent-transactions"
import { Highlights } from "./hightlights"
import { DashboardIcon } from "@radix-ui/react-icons"
import { fetchPhotocopyNotifications } from "@/lib/data"
import Notifications from "./notifications"
import useUrlParams from "@/lib/hooks/use-url-params"
import OverviewClient from "./overviewclient"

export default async function Overview() {
  const notifications = await fetchPhotocopyNotifications()

  return (
    <div className="flex lg:flex-row flex-col gap-3 w-full">
      <OverviewClient />
      <div className="flex flex-col  space-y-4 ">
        {/* Highlights */}
        <Highlights />
        {/* Overview graph and recent transactions */}
        {/* <div className="flex-grow grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>Sairam</CardContent>
          </Card>

          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Expenses </CardTitle>
              <CardDescription>This week your spent</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">Graph</CardContent>
          </Card>
        </div>{" "} */}
      </div>
      <div className="h-min flex-1">
        <Notifications notifications={notifications} />
      </div>
    </div>
  )
}
