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
    <div className="flex flex-col gap-3 w-full h-full">
      <OverviewClient />
    <div>
        <Highlights />
</div>
<div>
        <Notifications notifications={notifications} />
</div>
    </div>
  )
}
