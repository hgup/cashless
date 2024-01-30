import { Metadata } from "next"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDateRangePicker } from "@/components/student/date-range-picker"
import { Overview } from "@/components/student/overview"
import { RecentTransactions } from "@/components/student/recent-transactions"
import { auth } from "@/auth"
import SelectDate from "@/components/dashboard/transactions/select-date"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
}

export default async function PhotocopyPage({
  searchParams,
}: {
  searchParams?: {
    query?: string
    page?: string
    dateTo?: string
    dateFrom?: string
  }
}) {
  const authData = await auth()
  // const pending_prints = await

  return (
    <>
      <div className="flex-col h-full md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <h2 className="text-3xl font-bold ">Your Orders</h2>
          <div className="grid gap-4 lg:gap-8 md:grid-cols-1 h-4/5 lg:grid-cols-7">
            {/* Upload Area */}
            <div className="lg:row-start-1 lg:col-start-1 lg:col-span-2 h-full space-y-4 ">
              <Tabs defaultValue="pending" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger disabled={true} value="all">
                    All Orders
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="pending">
                  <Card>{}</Card>
                </TabsContent>
              </Tabs>
            </div>
            {/* Edit Area */}
            <Card className="lg:col-start-4 lg:col-span-4 h-full "></Card>
          </div>
        </div>
      </div>
    </>
  )
}
